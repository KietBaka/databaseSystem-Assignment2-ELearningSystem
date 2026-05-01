DELIMITER //

CREATE TRIGGER after_student_enroll
AFTER INSERT ON ENROLLMENT
FOR EACH ROW
BEGIN
    -- Tự động tăng số lượng sinh viên trong bảng COURSE khi có người đăng ký mới
    UPDATE COURSE 
    SET num_enrolled_students = num_enrolled_students + 1
    WHERE id = NEW.co_id;
    
    -- Tự động cập nhật số lượng khóa học mà sinh viên đang học
    UPDATE STUDENT
    SET num_courses_enrolled = num_courses_enrolled + 1
    WHERE id = NEW.student_id;
END; //

DELIMITER ;



DELIMITER //

CREATE TRIGGER before_student_enroll_check
BEFORE INSERT ON ENROLLMENT
FOR EACH ROW
BEGIN
    DECLARE current_enrollments INT;
    
    SELECT num_courses_enrolled INTO current_enrollments
    FROM STUDENT
    WHERE id = NEW.student_id;
    
    IF current_enrollments >= 8 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Bạn không được phép tham gia quá 8 môn học';
    END IF;
END; //

DELIMITER ;

-- trigger to avoid enrolling too many courses
DELIMITER //

CREATE TRIGGER before_attempt_check_duplicate
BEFORE INSERT ON ATTEMPT
FOR EACH ROW
BEGIN
    DECLARE attempt_count INT;
    
    -- check number of attempts
    SELECT COUNT(*) INTO attempt_count
    FROM ATTEMPT
    WHERE student_id = NEW.student_id
    AND quiz_id = NEW.quiz_id;
    
    IF attempt_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Sinh viên chỉ được làm tối đa 1 lần';
    END IF;
END; //

DELIMITER ;


--------------------------------------------------------
-- trigger to update gpa for one specific course
DELIMITER //

CREATE TRIGGER after_attempt_calculate_course_grade
AFTER INSERT ON ATTEMPT
FOR EACH ROW
BEGIN
    DECLARE course_id CHAR(255);
    DECLARE num_quizzes_in_course INT;
    DECLARE num_quizzes_completed INT;
    DECLARE calculated_course_grade FLOAT;
    DECLARE course_credits INT;
    DECLARE passing_grade FLOAT DEFAULT 5.0;
    DECLARE already_completed BOOLEAN;
    
    -- select the course
    SELECT co_id INTO course_id
    FROM QUIZ
    WHERE id = NEW.quiz_id;
    
    -- check if this quiz (midterm or final) is completed or not
    SELECT is_completed INTO already_completed
    FROM ENROLLMENT
    WHERE student_id = NEW.student_id AND co_id = course_id;

-- Step 1: Count total number of quizzes in the course (usually midterm + final)
-- Step 2: Count number of quizzes the student has completed
-- Step 3: Check if student has completed all required quizzes

-- If all quizzes are completed:
--   -> Calculate final course grade using weighted average of all quiz scores

-- Step 4: Update ENROLLMENT:
--   -> Set course_grade
--   -> Mark course as completed

-- Step 5: Evaluate pass/fail condition (passing grade >= 5.0)

-- Step 6: Update student statistics:
--   -> Add credits if passed
--   -> Increment number of completed courses

    IF NOT already_completed THEN
        SELECT COUNT(*) INTO num_quizzes_in_course
        FROM QUIZ
        WHERE co_id = course_id;
        
        SELECT COUNT(DISTINCT a.quiz_id) INTO num_quizzes_completed
        FROM ATTEMPT a
        JOIN QUIZ q ON a.quiz_id = q.id
        WHERE a.student_id = NEW.student_id
        AND q.co_id = course_id
        AND a.score IS NOT NULL;
        
        IF num_quizzes_completed >= num_quizzes_in_course THEN
            SELECT SUM(a.score * q.weight) / SUM(q.weight) INTO calculated_course_grade
            FROM ATTEMPT a
            JOIN QUIZ q ON a.quiz_id = q.id
            WHERE a.student_id = NEW.student_id
            AND q.co_id = course_id
            AND a.score IS NOT NULL;
            
            UPDATE ENROLLMENT
            SET course_grade = calculated_course_grade,
                is_completed = TRUE
            WHERE student_id = NEW.student_id AND co_id = course_id;
            
            IF calculated_course_grade >= passing_grade THEN
                SELECT s.credits INTO course_credits
                FROM COURSE c
                JOIN SUBJECT s ON c.sub_id = s.id
                WHERE c.id = course_id;
                
                UPDATE STUDENT
                SET earned_credits = earned_credits + course_credits,
                    num_courses_completed = num_courses_completed + 1
                WHERE id = NEW.student_id;
            END IF;
        END IF;
    END IF;
END; //

DELIMITER ;


----------------------------------------------------------
-- trigger to calculate total GPA for every courses. Calculation is taking placed for the first completed time
DELIMITER //

CREATE TRIGGER after_enrollment_update_total_gpa
AFTER UPDATE ON ENROLLMENT
FOR EACH ROW
BEGIN
    DECLARE total_gpa FLOAT;
    
-- Step 1: Ensure course_grade is newly set AND this is the first completion
-- (prevents recalculating GPA multiple times for the same course update)

-- Step 2: Recompute total GPA based on all completed courses for the student
-- GPA is calculated using credit-weighted average of course grades

-- Scenario: Use NULLIF to prevent division by zero when total credits = 0
-- (handles edge case where student has no completed courses yet)

    IF NEW.course_grade IS NOT NULL AND NEW.is_completed = TRUE AND 
       (OLD.course_grade IS NULL OR OLD.is_completed = FALSE) THEN

        SELECT SUM(e.course_grade * s.credits) / NULLIF(SUM(s.credits), 0) INTO total_gpa
        FROM ENROLLMENT e
        JOIN COURSE c ON e.co_id = c.id
        JOIN SUBJECT s ON c.sub_id = s.id
        WHERE e.student_id = NEW.student_id
        AND e.is_completed = TRUE
        AND e.course_grade IS NOT NULL;
        
        IF total_gpa IS NOT NULL THEN
            UPDATE STUDENT
            SET gpa = total_gpa
            WHERE id = NEW.student_id;
        END IF;
    END IF;
END; //

DELIMITER ;

-- trigger to re-calculate gpa and total gpa if there are mistakes in quiz (mid or final)
DELIMITER //

CREATE TRIGGER after_attempt_update_recalculate
AFTER UPDATE ON ATTEMPT
FOR EACH ROW
BEGIN
    DECLARE course_id CHAR(255);
    DECLARE num_quizzes_in_course INT;
    DECLARE num_quizzes_completed INT;
    DECLARE recalculated_course_grade FLOAT;
    DECLARE total_gpa FLOAT;
    DECLARE course_credits INT;
    DECLARE passing_grade FLOAT DEFAULT 5.0;
    DECLARE old_course_grade FLOAT;
    DECLARE was_passing BOOLEAN;
    DECLARE is_passing BOOLEAN;
    
-- step 1: Detect meaningful score change
-- only proceed if score is newly added or modified.

-- step 2: Identify course and check completion status
-- a course is only evaluated when all quizzes (midterm + final) are completed.

-- step 3: Recalculate course grade 

-- step 4: Update enrollment record with new course grade and determine pass/fail transition state.

-- step 5: Handle credit adjustment based on state transition:
-- fail -> pass: add credits
-- pass -> fail: remove credits
-- pass -> pass: no change

    IF NEW.score IS NOT NULL AND (OLD.score IS NULL OR OLD.score != NEW.score) THEN
        SELECT co_id INTO course_id
        FROM QUIZ
        WHERE id = NEW.quiz_id;
        
        SELECT course_grade INTO old_course_grade
        FROM ENROLLMENT
        WHERE student_id = NEW.student_id AND co_id = course_id;
        
        SELECT COUNT(*) INTO num_quizzes_in_course
        FROM QUIZ
        WHERE co_id = course_id;
        
        SELECT COUNT(DISTINCT a.quiz_id) INTO num_quizzes_completed
        FROM ATTEMPT a
        JOIN QUIZ q ON a.quiz_id = q.id
        WHERE a.student_id = NEW.student_id
        AND q.co_id = course_id
        AND a.score IS NOT NULL;
        
        IF num_quizzes_completed >= num_quizzes_in_course THEN
            SELECT SUM(a.score * q.weight) / SUM(q.weight) INTO recalculated_course_grade
            FROM ATTEMPT a
            JOIN QUIZ q ON a.quiz_id = q.id
            WHERE a.student_id = NEW.student_id
            AND q.co_id = course_id
            AND a.score IS NOT NULL;
            
            UPDATE ENROLLMENT
            SET course_grade = recalculated_course_grade,
                is_completed = TRUE
            WHERE student_id = NEW.student_id AND co_id = course_id;
            
            SET was_passing = (old_course_grade IS NOT NULL AND old_course_grade >= passing_grade);
            SET is_passing = (recalculated_course_grade >= passing_grade);
            
            IF was_passing != is_passing THEN
                SELECT s.credits INTO course_credits
                FROM COURSE c
                JOIN SUBJECT s ON c.sub_id = s.id
                WHERE c.id = course_id;
                
                IF is_passing THEN
                    -- Now passing: add credits
                    UPDATE STUDENT
                    SET earned_credits = earned_credits + course_credits,
                        num_courses_completed = num_courses_completed + 1
                    WHERE id = NEW.student_id;
                ELSE
                    -- No longer passing: remove credits
                    UPDATE STUDENT
                    SET earned_credits = earned_credits - course_credits,
                        num_courses_completed = num_courses_completed - 1
                    WHERE id = NEW.student_id;
                END IF;
            END IF;
            
            -- Recalculate total GPA
            SELECT SUM(e.course_grade * s.credits) / SUM(s.credits) INTO total_gpa
            FROM ENROLLMENT e
            JOIN COURSE c ON e.co_id = c.id
            JOIN SUBJECT s ON c.sub_id = s.id
            WHERE e.student_id = NEW.student_id
            AND e.is_completed = TRUE
            AND e.course_grade IS NOT NULL;
            
            -- Update student's total GPA
            IF total_gpa IS NOT NULL THEN
                UPDATE STUDENT
                SET gpa = total_gpa
                WHERE id = NEW.student_id;
            END IF;
        END IF;
    END IF;
END; //

DELIMITER ;


DELIMITER //

-- Kiểm tra định dạng CCCD, Mật khẩu và Vai trò hợp lệ
CREATE TRIGGER before_user_insert_check
BEFORE INSERT ON USER
FOR EACH ROW
BEGIN
    IF NEW.id_number NOT REGEXP '^[0-9]{12}$' THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Lỗi: Căn cước công dân (ID Number) phải có đúng 12 chữ số.';
    END IF;

    IF LENGTH(NEW.password) < 12 OR
       NEW.password NOT REGEXP '[A-Z]' OR
       NEW.password NOT REGEXP '[a-z]' OR
       NEW.password NOT REGEXP '[0-9]' OR
       NEW.password NOT REGEXP '[^a-zA-Z0-9]' THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Lỗi: Mật khẩu phải dài tối thiểu 12 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.';
    END IF;
    
    IF NEW.role NOT IN ('Giảng viên', 'Sinh viên') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi: Vai trò chỉ nhận giá trị Giảng viên hoặc Sinh viên.';
    END IF;
END; //

-- Đảm bảo SĐT có đúng 10 chữ số và bắt đầu bằng số 0
CREATE TRIGGER before_phone_insert_check
BEFORE INSERT ON USER_PHONE_NO
FOR EACH ROW
BEGIN
    IF NEW.phone_no NOT REGEXP '^0[0-9]{9}$' THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Lỗi: Số điện thoại phải có chính xác 10 chữ số và bắt đầu bằng số 0.';
    END IF;
END; //

-- Kiểm tra tính hợp lệ của nhiệm kỳ và đảm bảo Trưởng khoa phải trực thuộc Khoa
CREATE TRIGGER before_chairman_insert_check
BEFORE INSERT ON CHAIRMAN_TERM
FOR EACH ROW
BEGIN
    DECLARE is_working INT;

    IF NEW.end_date <= NEW.start_date THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Lỗi: Ngày kết thúc nhiệm kỳ phải sau ngày bắt đầu.';
    END IF;

    SELECT COUNT(*) INTO is_working
    FROM WORK
    WHERE lecturer_id = NEW.lecturer_id AND dept_id = NEW.dept_id;

    IF is_working = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Lỗi: Giảng viên làm Trưởng khoa phải công tác tại Khoa này.';
    END IF;
END; //

-- Đảm bảo thời gian đóng Quiz phải bằng hoặc sau thời gian mở + thời lượng làm bài
CREATE TRIGGER before_quiz_insert_check
BEFORE INSERT ON QUIZ
FOR EACH ROW
BEGIN
    IF NEW.close_time < DATE_ADD(NEW.open_time, INTERVAL NEW.duration MINUTE) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi: Thời gian đóng phải sau thời gian mở cộng với thời lượng làm bài.';
    END IF;
END; //

-- Chặn lưu câu hỏi nếu không thiết lập đáp án đúng
CREATE TRIGGER before_question_insert_check
BEFORE INSERT ON QUESTION
FOR EACH ROW
BEGIN
    IF NEW.correct_answer IS NULL OR TRIM(NEW.correct_answer) = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi: Câu hỏi bắt buộc phải có đáp án đúng (Correct_Answer).';
    END IF;
END; //

-- Kiểm tra thời gian nộp bài, khung giờ làm bài và giới hạn số lần thi
CREATE TRIGGER before_attempt_insert_check
BEFORE INSERT ON ATTEMPT
FOR EACH ROW
BEGIN
    DECLARE q_open, q_close DATETIME;
    DECLARE v_max_attempts INT;
    
    SELECT open_time, close_time, max_attempts INTO q_open, q_close, v_max_attempts
    FROM QUIZ
    WHERE id = NEW.quiz_id;

    IF NEW.submit_time <= NEW.start_time THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi: Thời gian nộp bài phải sau thời gian bắt đầu.';
    END IF;

    IF NEW.start_time < q_open OR NEW.submit_time > q_close THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi: Thời gian làm bài nằm ngoài khung cho phép của Quiz.';
    END IF;

    IF NEW.`order` > v_max_attempts THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Lỗi: Vượt quá số lần làm bài tối đa cho phép.';
    END IF;
END; //

-- Tự động cộng tổng điểm (Score) của ATTEMPT từ các câu trả lời (ANSWERS)
CREATE TRIGGER after_answer_insert_sync_score
AFTER INSERT ON ANSWERS
FOR EACH ROW
BEGIN
    UPDATE ATTEMPT
    SET score = (
        SELECT SUM(earned_score)
        FROM ANSWERS
        WHERE student_id = NEW.student_id
          AND quiz_id = NEW.quiz_id
          AND `order` = NEW.`order`
    )
    WHERE student_id = NEW.student_id
      AND quiz_id = NEW.quiz_id
      AND `order` = NEW.`order`;
END; //

DELIMITER ;
