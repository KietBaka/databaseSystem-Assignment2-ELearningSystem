-- Foreign Keys for USER_PHONE_NO
ALTER TABLE `USER_PHONE_NO` 
  ADD CONSTRAINT `fk_user_phone_user` 
  FOREIGN KEY (`user_id`) REFERENCES `USER` (`id`) 
  ON DELETE CASCADE;

-- Foreign Keys for STUDENT
ALTER TABLE `STUDENT` 
  ADD CONSTRAINT `fk_student_user` 
  FOREIGN KEY (`id`) REFERENCES `USER` (`id`) 
  ON DELETE CASCADE;

ALTER TABLE `STUDENT` 
  ADD CONSTRAINT `fk_student_dept` 
  FOREIGN KEY (`dept_id`) REFERENCES `DEPARTMENT` (`id`) 
  ON DELETE SET NULL;

-- Foreign Keys for LECTURER
ALTER TABLE `LECTURER` 
  ADD CONSTRAINT `fk_lecturer_user` 
  FOREIGN KEY (`id`) REFERENCES `USER` (`id`) 
  ON DELETE CASCADE;

-- Foreign Keys for LECTURER_DEGREE
ALTER TABLE `LECTURER_DEGREE` 
  ADD CONSTRAINT `fk_degree_lecturer` 
  FOREIGN KEY (`lecturer_id`) REFERENCES `LECTURER` (`id`) 
  ON DELETE CASCADE;

-- Foreign Keys for DEPARTMENT
ALTER TABLE `DEPARTMENT` 
  ADD CONSTRAINT `fk_dept_chairman` 
  FOREIGN KEY (`chairman_id`) REFERENCES `LECTURER` (`id`) 
  ON DELETE SET NULL;

-- Foreign Keys for CHAIRMAN_TERM
ALTER TABLE `CHAIRMAN_TERM` 
  ADD CONSTRAINT `fk_term_dept` 
  FOREIGN KEY (`dept_id`) REFERENCES `DEPARTMENT` (`id`) 
  ON DELETE CASCADE;

ALTER TABLE `CHAIRMAN_TERM` 
  ADD CONSTRAINT `fk_term_lecturer` 
  FOREIGN KEY (`lecturer_id`) REFERENCES `LECTURER` (`id`) 
  ON DELETE CASCADE;

-- Foreign Keys for SUBJECT
ALTER TABLE `SUBJECT` 
  ADD CONSTRAINT `fk_subject_dept` 
  FOREIGN KEY (`dept_id`) REFERENCES `DEPARTMENT` (`id`) 
  ON DELETE SET NULL;

-- Foreign Keys for COURSE
ALTER TABLE `COURSE` 
  ADD CONSTRAINT `fk_course_subject` 
  FOREIGN KEY (`sub_id`) REFERENCES `SUBJECT` (`id`) 
  ON DELETE SET NULL;

ALTER TABLE `COURSE` 
  ADD CONSTRAINT `fk_course_lecturer` 
  FOREIGN KEY (`lecturer_id`) REFERENCES `LECTURER` (`id`) 
  ON DELETE SET NULL;

-- Foreign Keys for SECTION
ALTER TABLE `SECTION` 
  ADD CONSTRAINT `fk_section_course` 
  FOREIGN KEY (`co_id`) REFERENCES `COURSE` (`id`) 
  ON DELETE CASCADE;

ALTER TABLE `SECTION` 
  ADD CONSTRAINT `fk_section_lecturer` 
  FOREIGN KEY (`lecturer_id`) REFERENCES `LECTURER` (`id`) 
  ON DELETE SET NULL;

-- Foreign Keys for LECTURE
ALTER TABLE `LECTURE` 
  ADD CONSTRAINT `fk_lecture_section` 
  FOREIGN KEY (`sec_order`, `co_id`) REFERENCES `SECTION` (`sec_order`, `co_id`) 
  ON DELETE CASCADE;

ALTER TABLE `LECTURE` 
  ADD CONSTRAINT `fk_lecture_lecturer` 
  FOREIGN KEY (`lecturer_id`) REFERENCES `LECTURER` (`id`) 
  ON DELETE SET NULL;

-- Foreign Keys for LECTURE_MATERIAL_LINK
ALTER TABLE `LECTURE_MATERIAL_LINK` 
  ADD CONSTRAINT `fk_material_lecture` 
  FOREIGN KEY (`lecture_id`, `sec_order`, `co_id`) REFERENCES `LECTURE` (`id`, `sec_order`, `co_id`) 
  ON DELETE CASCADE;

-- Foreign Keys for QUIZ
ALTER TABLE `QUIZ` 
  ADD CONSTRAINT `fk_quiz_course` 
  FOREIGN KEY (`co_id`) REFERENCES `COURSE` (`id`) 
  ON DELETE CASCADE;

ALTER TABLE `QUIZ` 
  ADD CONSTRAINT `fk_quiz_lecturer` 
  FOREIGN KEY (`lecturer_id`) REFERENCES `LECTURER` (`id`) 
  ON DELETE SET NULL;

-- Foreign Keys for QUESTION
ALTER TABLE `QUESTION` 
  ADD CONSTRAINT `fk_question_quiz` 
  FOREIGN KEY (`quiz_id`) REFERENCES `QUIZ` (`id`) 
  ON DELETE CASCADE;

ALTER TABLE `QUESTION` 
  ADD CONSTRAINT `fk_question_lecturer` 
  FOREIGN KEY (`lecturer_id`) REFERENCES `LECTURER` (`id`) 
  ON DELETE SET NULL;

-- Foreign Keys for WORK
ALTER TABLE `WORK` 
  ADD CONSTRAINT `fk_work_dept` 
  FOREIGN KEY (`dept_id`) REFERENCES `DEPARTMENT` (`id`) 
  ON DELETE CASCADE;

ALTER TABLE `WORK` 
  ADD CONSTRAINT `fk_work_lecturer` 
  FOREIGN KEY (`lecturer_id`) REFERENCES `LECTURER` (`id`) 
  ON DELETE CASCADE;

-- Foreign Keys for ENROLLMENT
ALTER TABLE `ENROLLMENT` 
  ADD CONSTRAINT `fk_enrollment_student` 
  FOREIGN KEY (`student_id`) REFERENCES `STUDENT` (`id`) 
  ON DELETE CASCADE;

ALTER TABLE `ENROLLMENT` 
  ADD CONSTRAINT `fk_enrollment_course` 
  FOREIGN KEY (`co_id`) REFERENCES `COURSE` (`id`) 
  ON DELETE CASCADE;

-- Foreign Keys for ATTEMPT
ALTER TABLE `ATTEMPT` 
  ADD CONSTRAINT `fk_attempt_student` 
  FOREIGN KEY (`student_id`) REFERENCES `STUDENT` (`id`) 
  ON DELETE CASCADE;

ALTER TABLE `ATTEMPT` 
  ADD CONSTRAINT `fk_attempt_quiz` 
  FOREIGN KEY (`quiz_id`) REFERENCES `QUIZ` (`id`) 
  ON DELETE CASCADE;

-- Foreign Keys for ANSWER
ALTER TABLE `ANSWER` 
  ADD CONSTRAINT `fk_answer_attempt` 
  FOREIGN KEY (`att_order`, `student_id`, `quiz_id`) REFERENCES `ATTEMPT` (`order`, `student_id`, `quiz_id`) 
  ON DELETE CASCADE;

ALTER TABLE `ANSWER` 
  ADD CONSTRAINT `fk_answer_question` 
  FOREIGN KEY (`question_id`, `quiz_id`) REFERENCES `QUESTION` (`id`, `quiz_id`) 
  ON DELETE CASCADE;

-- Foreign Keys for INTERACT
ALTER TABLE `INTERACT` 
  ADD CONSTRAINT `fk_interact_student` 
  FOREIGN KEY (`student_id`) REFERENCES `STUDENT` (`id`) 
  ON DELETE CASCADE;

ALTER TABLE `INTERACT` 
  ADD CONSTRAINT `fk_interact_lecture` 
  FOREIGN KEY (`lecture_id`, `sec_order`, `co_id`) REFERENCES `LECTURE` (`id`, `sec_order`, `co_id`) 
  ON DELETE CASCADE;
