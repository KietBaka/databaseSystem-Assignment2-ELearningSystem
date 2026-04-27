INSERT INTO USER(id, username, password, email, fullname, role, identity, address) 
VALUES 
    (2411141, 'VietHoa', '123abc', 'hoanguyen@hcmut.edu.vn', 'Nguyen Mai Viet Hoa', 'student', '1234567', 'Dong Nai'),
    (0200001, 'ThoQuan', '123abcd', 'thoquan@hcmut.edu.vn', 'Quan Thanh Tho', 'lecturer', '2345678', 'Ho Chi Minh City');


INSERT INTO STUDENT(id, dept_id, gpa, earned_credits, num_courses_enrolled, num_courses_completed)
VALUES
    (2411141, 001, 3.3, 11, 3, 2); 

INSERT INTO LECTURER(id, teaching_experience)
VALUES 
    (000001, 10);



