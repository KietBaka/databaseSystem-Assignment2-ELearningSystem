import React, { createContext, useState, useEffect, useContext } from 'react';
import { courseService } from '../services/courseService';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading

    // Tự động gọi API lấy danh sách khóa học khi App vừa bật lên
    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                const data = await courseService.getAllCourses();
                setCourses(data);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu khóa học:", error);
            } finally {
                setIsLoading(false); // Tải xong thì tắt loading
            }
        };
        fetchCourses();
    }, []);

    // Hàm lấy deadline từ tất cả khóa học cho Lịch Deadline
    const getDeadlines = () => {
        let allDeadlines = [];
        courses.forEach(course => {
            course.quizzes?.forEach(quiz => {
                if (quiz.date) allDeadlines.push({ ...quiz, course: course.name, courseId: course.id, type: 'quiz', id: `q_${quiz.id}` });
            });
            course.assignments?.forEach(ass => {
                if (ass.date) allDeadlines.push({ ...ass, course: course.name, courseId: course.id, type: 'assignment', id: `a_${ass.id}` });
            });
        });
        return allDeadlines;
    };

    // Hàm thêm Quiz mới (dành cho Giáo viên)
    const addQuizToCourse = (courseId, newQuiz) => {
        setCourses(prevCourses => prevCourses.map(course => {
            if (course.id === courseId) {
                return { ...course, quizzes: [newQuiz, ...(course.quizzes || [])] };
            }
            return course;
        }));
    };

    return (
        // Truyền thêm isLoading xuống cho các trang sử dụng
        <DataContext.Provider value={{ courses, isLoading, getDeadlines, addQuizToCourse }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);