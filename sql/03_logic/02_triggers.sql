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