// services/quizService.js

// 1. DỮ LIỆU MOCK KHỚP 100% VỚI COMPONENTS UI
const MOCK_QUIZ_DATA = {
    "config": {
        "id": 1,
        "co_id": "CS101",
        "lecturer_id": 99,
        "open_time": "2026-04-20T00:00:00.000Z",
        "close_time": "2026-05-10T23:59:00.000Z",
        "duration": 30,
        "weight": 0.2,
        "max_attempts": 3,
        "attemptCount": 1,
        "maxAttempt": 3
    },
    "questions": [
        {
            "id": 101,
            "displayIdx": 0,
            "question": "Trong C++, kiểu dữ liệu nào dùng để lưu số nguyên?",
            "options": {
                "A": "int",
                "B": "float",
                "C": "char",
                "D": "double"
            },
            "numCorrect": 1,
            "isMultiple": false,
            "points": 5,
            "_originalOptionOrder": ["opt1", "opt2", "opt3", "opt4"],
            "_shuffledOptionOrder": ["opt1", "opt2", "opt3", "opt4"],
            "_optionPerm": { "0": 0, "1": 1, "2": 2, "3": 3 }
        },
        {
            "id": 102,
            "displayIdx": 1,
            "question": "Những ngôn ngữ nào dưới đây là ngôn ngữ lập trình hướng đối tượng?",
            "options": {
                "A": "HTML",
                "B": "C++",
                "C": "Java",
                "D": "C"
            },
            "numCorrect": 2,
            "isMultiple": true,
            "points": 5,
            "_originalOptionOrder": ["o1", "o2", "o3", "o4"],
            "_shuffledOptionOrder": ["o2", "o3", "o4", "o1"],
            "_optionPerm": { "0": 1, "1": 2, "2": 3, "3": 0 }
        }
    ]
};

const MOCK_QUIZ_RESULT = {
    totalScore: 8.5,
    totalPoints: 10,
    percentage: 85,
    attemptOrder: 1,
    submitTime: new Date().toISOString(),
    graded: [
        {
            questionId: 101,
            displayIdx: 0,
            question: "Trong C++, kiểu dữ liệu nào dùng để lưu số nguyên?",
            isMultiple: false,
            isCorrect: true,
            earned: 5,
            maxPoints: 5,
            options: [
                { label: "A", text: "int", isCorrect: true, isSelected: true },
                { label: "B", text: "float", isCorrect: false, isSelected: false },
                { label: "C", text: "char", isCorrect: false, isSelected: false },
                { label: "D", text: "double", isCorrect: false, isSelected: false }
            ]
        },
        {
            questionId: 102,
            displayIdx: 1,
            question: "Những ngôn ngữ nào dưới đây là ngôn ngữ lập trình hướng đối tượng?",
            isMultiple: true,
            isCorrect: false,
            earned: 2.5,
            maxPoints: 5,
            options: [
                { label: "A", text: "HTML", isCorrect: false, isSelected: true },
                { label: "B", text: "C++", isCorrect: true, isSelected: true },
                { label: "C", text: "Java", isCorrect: true, isSelected: false },
                { label: "D", text: "C", isCorrect: false, isSelected: false }
            ]
        }
    ]
};


// 2. CÁC HÀM API GIẢ LẬP
export const quizService = {
    getQuizData: async (studentId, quizId) => {
        return MOCK_QUIZ_DATA;
        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve(MOCK_QUIZ_DATA);
        //     }, 600); // 0.6s loading
        // });
    },

    submitQuiz: async (payload, quizId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Submit Payload:", payload);
                resolve({ attemptOrder: MOCK_QUIZ_DATA.config.attemptCount + 1 });
            }, 1000);
        });
    },

    getQuizResult: async (studentId, quizId, attemptId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_QUIZ_RESULT);
            }, 600);
        });
    }
};