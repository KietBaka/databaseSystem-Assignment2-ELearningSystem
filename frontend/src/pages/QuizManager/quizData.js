const mockQuizData = {
    courseInfo: {
        id: "CS101",
        name: "Nhập môn Lập trình"
    },
    stats: {
        totalQuizzes: 1,
        totalQuestions: 2,
        avgTime: 30
    },
    quizzes: [
        {
            id: 1,
            title: "Kiểm tra giữa kỳ",
            description: "Đánh giá kiến thức cơ bản về biến, vòng lặp.",
            duration: 30,
            questionCount: 2,
            questions: [
                {
                    id: 101,
                    content: "Trong C++, kiểu dữ liệu nào dùng để lưu số nguyên?",
                    options: ["int", "float", "char", "double"],
                    correctIndices: [0]
                },
                {
                    id: 102,
                    content: "Những ngôn ngữ nào dưới đây là ngôn ngữ lập trình hướng đối tượng?",
                    options: ["C", "Java", "C++", "HTML"],
                    correctIndices: [1, 2] // Chọn nhiều đáp án
                }
            ]
        }
    ]
};

export default mockQuizData;