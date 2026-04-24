CREATE VIEW view_student_results AS
SELECT 
    u.fullname,
    s.id AS student_id,
    c.name AS course_name,
    q.id AS quiz_id,
    MAX(a.score) AS highest_score,
    COUNT(a.order) AS attempts_made
FROM USER u
JOIN STUDENT s ON u.id = s.id
JOIN ENROLLMENT e ON s.id = e.student_id
JOIN COURSE c ON e.co_id = c.id
LEFT JOIN QUIZ q ON c.id = q.co_id
LEFT JOIN ATTEMPT a ON (s.id = a.student_id AND q.id = a.quiz_id)
GROUP BY s.id, q.id, c.id;