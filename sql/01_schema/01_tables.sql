CREATE TABLE `USER` (
  `id` INT PRIMARY KEY,
  `username` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE,
  `fullname` VARCHAR(255),
  `role` VARCHAR(255),
  `identity` VARCHAR(255),
  `address` TEXT
);

CREATE TABLE `USER_PHONE_NO` (
  `phone_no` VARCHAR(255),
  `user_id` INT,
  PRIMARY KEY (`phone_no`, `user_id`)
);

CREATE TABLE `STUDENT` (
  `id` INT PRIMARY KEY,
  `dept_id` INT,
  `gpa` FLOAT DEFAULT 0,
  `earned_credits` INT DEFAULT 0,
  `num_courses_enrolled` INT DEFAULT 0,
  `num_courses_completed` INT DEFAULT 0
);

CREATE TABLE `LECTURER` (
  `id` INT PRIMARY KEY,
  `teaching_experience` INT
);

CREATE TABLE `LECTURER_DEGREE` (
  `degree` VARCHAR(255),
  `lecturer_id` INT,
  PRIMARY KEY (`degree`, `lecturer_id`)
);

CREATE TABLE `DEPARTMENT` (
  `id` INT PRIMARY KEY,
  `name` VARCHAR(255) UNIQUE,
  `foundation_date` DATE,
  `chairman_id` INT
);

CREATE TABLE `CHAIRMAN_TERM` (
  `dept_id` INT,
  `lecturer_id` INT,
  `start_date` DATE,
  `end_date` DATE,
  PRIMARY KEY (`dept_id`, `lecturer_id`, `start_date`)
);

CREATE TABLE `SUBJECT` (
  `id` INT PRIMARY KEY,
  `dept_id` INT,
  `name` VARCHAR(255),
  `credits` INT,
  `syllabus` TEXT
);

CREATE TABLE `COURSE` (
  `id` CHAR(10) PRIMARY KEY,
  `sub_id` INT,
  `lecturer_id` INT,
  `name` VARCHAR(255),
  `description` TEXT,
  `num_enrolled_students` INT DEFAULT 0
);

CREATE TABLE `SECTION` (
  `sec_order` INT,
  `co_id` CHAR(10),
  `lecturer_id` INT,
  `name` VARCHAR(255),
  PRIMARY KEY (`sec_order`, `co_id`)
);

CREATE TABLE `LECTURE` (
  `id` INT,
  `sec_order` INT,
  `co_id` CHAR(10),
  `lecturer_id` INT,
  `title` VARCHAR(255),
  PRIMARY KEY (`id`, `sec_order`, `co_id`)
);

CREATE TABLE `LECTURE_MATERIAL_LINK` (
  `material_link` VARCHAR(255),
  `lecture_id` INT,
  `sec_order` INT,
  `co_id` CHAR(10),
  PRIMARY KEY (`material_link`, `lecture_id`, `sec_order`, `co_id`)
);

CREATE TABLE `QUIZ` (
  `id` INT PRIMARY KEY,
  `co_id` CHAR(10),
  `lecturer_id` INT,
  `open_time` TIMESTAMP,
  `close_time` TIMESTAMP,
  `duration` INT,
  `weight` FLOAT,
  `max_attempts` INT
);

CREATE TABLE `QUESTION` (
  `id` INT,
  `quiz_id` INT,
  `lecturer_id` INT,
  `content` TEXT,
  `correct_answer` TEXT,
  `points` INT,
  PRIMARY KEY (`id`, `quiz_id`)
);

CREATE TABLE `WORK` (
  `dept_id` INT,
  `lecturer_id` INT,
  PRIMARY KEY (`dept_id`, `lecturer_id`)
);

CREATE TABLE `ENROLLMENT` (
  `student_id` INT,
  `co_id` CHAR(10),
  `enroll_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`student_id`, `co_id`)
);

CREATE TABLE `ATTEMPT` (
  `order` INT,
  `student_id` INT,
  `quiz_id` INT,
  `start_time` TIMESTAMP,
  `submit_time` TIMESTAMP,
  `score` FLOAT,
  PRIMARY KEY (`order`, `student_id`, `quiz_id`)
);

CREATE TABLE `ANSWER` (
  `att_order` INT,
  `student_id` INT,
  `quiz_id` INT,
  `question_id` INT,
  `student_answer` TEXT,
  `earned_score` FLOAT,
  PRIMARY KEY (`att_order`, `student_id`, `quiz_id`, `question_id`)
);

CREATE TABLE `INTERACT` (
  `student_id` INT,
  `lecture_id` INT,
  `sec_order` INT,
  `co_id` CHAR(10),
  `last_accessed` TIMESTAMP,
  PRIMARY KEY (`student_id`, `lecture_id`, `sec_order`, `co_id`)
);
