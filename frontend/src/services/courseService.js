// src/services/courseService.js
import { initialCurriculum } from "../pages/CurriculumManager/curriculumData";
// Sau này chỉ cần thay đổi URL này khi có Backend thật
const API_URL = "http://localhost:3000/api/courses"; 

export const courseService = {
    // Lấy toàn bộ danh sách khóa học
    getAllCourses: async () => {
        // Giả lập lấy data từ database
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: "CS101",
                        name: "Lập trình nâng cao",
                        lecturer: "TS. Nguyễn Văn A",
                        department: "Khoa học máy tính",
                        credits: 3,
                        color: '#4facfe',
                        stats: { enrolledStudents: 42, maxStudents: 50, progress: 65, averageScore: 8.2 },
                        quizzes: [
                            { id: 101, title: "Kiểm tra giữa kỳ", duration: 30, questionCount: 5, date: "2026-04-10" }
                        ],
                        assignments: [
                            { id: 201, title: "Nộp bài tập lớn (BTL)", date: "2026-04-20" }
                        ]
                    },
                    {
                        id: "CO2003",
                        name: "Hệ điều hành",
                        lecturer: "TS. Trần Văn B",
                        department: "Kỹ thuật Máy tính",
                        credits: 4,
                        color: '#f093fb',
                        stats: { enrolledStudents: 65, maxStudents: 80, progress: 40, averageScore: 7.5 },
                        quizzes: [],
                        assignments: []
                    }
                ]);
            }, 800);
        });
    }
};