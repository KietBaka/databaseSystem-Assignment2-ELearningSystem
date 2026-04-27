-- Add course_grade column to ENROLLMENT table to store individual course grades
-- This allows us to track each student's grade per course after completing both midterm and final

ALTER TABLE `ENROLLMENT` 
ADD COLUMN `course_grade` float DEFAULT NULL,
ADD COLUMN `is_completed` boolean DEFAULT FALSE;

-- course_grade: The final grade for the course (0-10 scale), calculated when both midterm and final are completed
-- is_completed: Flag to indicate if the student has completed both midterm and final exams
