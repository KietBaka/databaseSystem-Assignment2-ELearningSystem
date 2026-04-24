CREATE TABLE `USER` (
  `id` integer PRIMARY KEY,
  `username` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE,
  `fullname` varchar(255),
  `role` varchar(255),
  `identity` varchar(255),
  `address` text
);

CREATE TABLE `USER_PHONE_NO` (
  `phone_no` varchar(255),
  `user_id` integer,
  PRIMARY KEY (`phone_no`, `user_id`)
);

CREATE TABLE `STUDENT` (
  `id` integer PRIMARY KEY,
  `dept_id` integer,
  `gpa` float DEFAULT 0,
  `earned_credits` integer DEFAULT 0,
  `num_courses_enrolled` integer DEFAULT 0,
  `num_courses_completed` integer DEFAULT 0
);

CREATE TABLE `LECTURER` (
  `id` integer PRIMARY KEY,
  `teaching_experience` integer
);

CREATE TABLE `LECTURER_DEGREE` (
  `degree` varchar(255),
  `lecturer_id` integer,
  PRIMARY KEY (`degree`, `lecturer_id`)
);

CREATE TABLE `DEPARTMENT` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) UNIQUE,
  `foundation_date` date,
  `chairman_id` integer
);

CREATE TABLE `CHAIRMAN_TERM` (
  `dept_id` integer,
  `lecturer_id` integer,
  `start_date` date,
  `end_date` date,
  PRIMARY KEY (`dept_id`, `lecturer_id`, `start_date`)
);

CREATE TABLE `SUBJECT` (
  `id` integer PRIMARY KEY,
  `dept_id` integer,
  `name` varchar(255),
  `credits` integer,
  `syllabus` text
);

CREATE TABLE `COURSE` (
  `id` char PRIMARY KEY,
  `sub_id` integer,
  `lecturer_id` integer,
  `name` varchar(255),
  `description` text,
  `num_enrolled_students` integer DEFAULT 0
);

CREATE TABLE `SECTION` (
  `sec_order` integer,
  `co_id` char,
  `lecturer_id` integer,
  `name` varchar(255),
  PRIMARY KEY (`sec_order`, `co_id`)
);

CREATE TABLE `LECTURE` (
  `id` integer,
  `sec_order` integer,
  `co_id` char,
  `lecturer_id` integer,
  `title` varchar(255),
  PRIMARY KEY (`id`, `sec_order`, `co_id`)
);

CREATE TABLE `LECTURE_MATERIAL_LINK` (
  `material_link` varchar(255),
  `lecture_id` integer,
  `sec_order` integer,
  `co_id` char,
  PRIMARY KEY (`material_link`, `lecture_id`, `sec_order`, `co_id`)
);

CREATE TABLE `QUIZ` (
  `id` integer PRIMARY KEY,
  `co_id` char,
  `lecturer_id` integer,
  `open_time` timestamp,
  `close_time` timestamp,
  `duration` integer,
  `weight` float,
  `max_attempts` integer
);

CREATE TABLE `QUESTION` (
  `id` integer,
  `quiz_id` integer,
  `lecturer_id` integer,
  `content` text,
  `correct_answer` text,
  `points` integer,
  PRIMARY KEY (`id`, `quiz_id`)
);

CREATE TABLE `WORK` (
  `dept_id` integer,
  `lecturer_id` integer,
  PRIMARY KEY (`dept_id`, `lecturer_id`)
);

CREATE TABLE `ENROLLMENT` (
  `student_id` integer,
  `co_id` char,
  `enroll_date` timestamp DEFAULT (now()),
  PRIMARY KEY (`student_id`, `co_id`)
);

CREATE TABLE `ATTEMPT` (
  `order` integer,
  `student_id` integer,
  `quiz_id` integer,
  `start_time` timestamp,
  `submit_time` timestamp,
  `score` float,
  PRIMARY KEY (`order`, `student_id`, `quiz_id`)
);

CREATE TABLE `ANSWER` (
  `att_order` integer,
  `student_id` integer,
  `quiz_id` integer,
  `question_id` integer,
  `student_answer` text,
  `earned_score` float,
  PRIMARY KEY (`att_order`, `student_id`, `quiz_id`, `question_id`)
);

CREATE TABLE `INTERACT` (
  `student_id` integer,
  `lecture_id` integer,
  `sec_order` integer,
  `co_id` char,
  `last_accessed` timestamp,
  PRIMARY KEY (`student_id`, `lecture_id`, `sec_order`, `co_id`)
);