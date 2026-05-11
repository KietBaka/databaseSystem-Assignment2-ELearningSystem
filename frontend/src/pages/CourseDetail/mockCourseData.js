// src/pages/CourseDetail/mockCourseData.js

const mockCourseData = [
    {
        // ==========================================
        // THỰC THỂ: COURSE
        // ==========================================
        id: "CS101",
        name: "Nhập môn Lập trình",
        description: "Học các khái niệm cơ bản về lập trình, cấu trúc dữ liệu và giải thuật. Khóa học này cung cấp nền tảng vững chắc để tiếp cận các hệ thống phức tạp hơn.",
        num_of_enrolled_students: 42,
        
        // CÁC TRƯỜNG BỔ SUNG CHO UI (Frontend cần)
        department: "Khoa học máy tính",
        credits: 3,
        schedule: "Thứ 2, 4 - 13:00-15:00",
        semester: "HK1 2025-2026",
        role: "student",

        // ==========================================
        // QUAN HỆ: MANAGE (LECTURER)
        // ==========================================
        managed_by: {
            id: "L01",
            fullname: "TS. Nguyễn Văn A",
            degree: "Tiến sĩ"
        },

        // ==========================================
        // QUAN HỆ: HAS (SECTION & LECTURE)
        // ==========================================
        sections: [
            {
                section_order: 1,
                name: "Giới thiệu & Môi trường",
                num_of_lecture: 1,
                lectures: [
                    { id: "LEC_1", title: "Bài giảng Tuần 1: Cài đặt môi trường", material_link: "https://drive.google.com/...", date: "2026-04-01" }
                ]
            },
            {
                section_order: 2,
                name: "Cấu trúc dữ liệu",
                num_of_lecture: 2,
                lectures: [
                    { id: "LEC_2", title: "Tài liệu đọc thêm: Cấu trúc dữ liệu", material_link: "https://example.com/docs", date: "2026-04-05" },
                    { id: "LEC_3", title: "Video hướng dẫn giải bài tập Lab 1", material_link: "https://youtube.com/...", date: "2026-04-10" }
                ]
            }
        ],

        // ==========================================
        // QUAN HỆ: HAS (QUIZ, QUESTION, ATTEMPT)
        // ==========================================
        quizzes: [
            {
                id: "QZ_1",
                title: "Kiểm tra giữa kỳ – Nhập môn Lập trình",
                weight: 0.3,
                max_attempts: 3,
                duration: 30,
                open_time: "2026-04-15T08:00:00",
                close_time: "2026-04-20T23:59:00", 
                
                questions: [
                    { question_no: 1, content: "Khai báo biến trong C++?", points: 2, correct_answer: "A" },
                    { question_no: 2, content: "Vòng lặp while hoạt động như thế nào?", points: 2, correct_answer: "B" }
                ],
                
                attempts: [
                    { order: 1, start_time: "2026-04-16T09:00:00", submit_time: "2026-04-16T09:25:00", score: 8.5 }
                ]
            }
        ],

        // ==========================================
        // QUAN HỆ: ENROLL (STUDENT)
        // ==========================================
        students: [
            { id: "20210001", fullname: "Sinh viên 1", gpa: 3.2, status: "Đang học" },
            { id: "20210002", fullname: "Sinh viên 2", gpa: 3.5, status: "Đang học" }
        ]
    },
    {
        // ==========================================
        // THỰC THỂ: COURSE
        // ==========================================
        id: "CO2003",
        name: "Hệ điều hành",
        description: "Môn học cung cấp kiến thức nền tảng về hệ điều hành: quản lý tiến trình (Process), định thời CPU, đồng bộ hóa, quản lý bộ nhớ và hệ thống tệp. Thực hành trên môi trường Linux.",
        num_of_enrolled_students: 65,
        
        department: "Kỹ thuật Máy tính",
        credits: 4,
        schedule: "Thứ 3, 5 - 08:00-10:00",
        semester: "HK1 2025-2026",
        role: "student",

        // ==========================================
        // QUAN HỆ: MANAGE (LECTURER)
        // ==========================================
        managed_by: {
            id: "L02",
            fullname: "TS. Trần Văn B",
            degree: "Tiến sĩ"
        },

        // ==========================================
        // QUAN HỆ: HAS (SECTION & LECTURE)
        // ==========================================
        sections: [
            {
                section_order: 1,
                name: "Tổng quan về HĐH",
                num_of_lecture: 2,
                lectures: [
                    { id: "LEC_101", title: "Chương 1: Tổng quan về HĐH", material_link: "#", date: "2026-04-02" },
                    { id: "LEC_102", title: "Hướng dẫn cài đặt Ubuntu/Máy ảo", material_link: "#", date: "2026-04-05" }
                ]
            },
            {
                section_order: 2,
                name: "Quản lý tiến trình",
                num_of_lecture: 1,
                lectures: [
                    { id: "LEC_103", title: "Chương 2: Quản lý tiến trình (Process)", material_link: "#", date: "2026-04-12" }
                ]
            }
        ],

        // ==========================================
        // QUAN HỆ: HAS (QUIZ, QUESTION, ATTEMPT)
        // ==========================================
        quizzes: [
            {
                id: "QZ_2",
                title: "Quiz 1: Tiến trình & Luồng (Threads)",
                weight: 0.1,
                max_attempts: 1,
                duration: 15,
                open_time: "2026-04-15T00:00:00",
                close_time: "2026-04-15T23:59:00",
                
                questions: [
                    { question_no: 1, content: "Phân biệt Process và Thread?", points: 10, correct_answer: "C" }
                ],

                attempts: [
                    { order: 1, start_time: "2026-04-15T10:00:00", submit_time: "2026-04-15T10:14:00", score: 7.0 }
                ]
            }
        ],

        // ==========================================
        // QUAN HỆ: ENROLL (STUDENT)
        // ==========================================
        students: [
            { id: "20210001", fullname: "Sinh viên 1", gpa: 3.2, status: "Đang học" },
            { id: "20210015", fullname: "Nguyễn Văn C", gpa: 2.8, status: "Đang học" },
            { id: "20210022", fullname: "Lê Thị D", gpa: 3.9, status: "Đang học" }
        ]
    }
];

export default mockCourseData;