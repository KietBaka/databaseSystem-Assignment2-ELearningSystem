// data/questions.js

export const QUIZ_CONFIG = {
    title: "Kiểm tra kiến thức tổng hợp",
    timeLimit: 60, // Thời gian làm bài tính bằng giây (600s = 10 phút)
};

export const questions = [
    {
        id: 1,
        question: "Thủ đô của Việt Nam là gì?",
        options: ["Hồ Chí Minh", "Đà Nẵng", "Hà Nội", "Huế"],
        correct: 2,
    },
    {
        id: 2,
        question: "Núi cao nhất thế giới là gì?",
        options: ["K2", "Everest", "Kangchenjunga", "Lhotse"],
        correct: 1,
    },
    {
        id: 3,
        question: "Ai viết tác phẩm 'Truyện Kiều'?",
        options: ["Hồ Xuân Hương", "Nguyễn Du", "Nam Quốc Sơn Hà", "Nguyễn Trãi"],
        correct: 1,
    },
    {
        id: 4,
        question: "Hành tinh nào lớn nhất trong hệ mặt trời?",
        options: ["Sao Thổ", "Sao Hỏa", "Sao Mộc", "Sao Thiên Vương"],
        correct: 2,
    },
    {
        id: 5,
        question: "Nguyên tố hóa học nào có ký hiệu 'O'?",
        options: ["Vàng", "Oxy", "Osmium", "Oxit"],
        correct: 1,
    },
    {
        id: 6,
        question: "Sông dài nhất thế giới là sông nào?",
        options: ["Amazon", "Nile", "Dương Tử", "Mississippi"],
        correct: 1,
    },
    {
        id: 7,
        question: "Quốc gia nào có diện tích lớn nhất thế giới?",
        options: ["Trung Quốc", "Canada", "Mỹ", "Nga"],
        correct: 3,
    },
    {
        id: 8,
        question: "Họa sĩ thiên tài Leonardo da Vinci là người nước nào?",
        options: ["Pháp", "Đức", "Ý", "Tây Ban Nha"],
        correct: 2,
    },
    {
        id: 9,
        question: "Đơn vị tiền tệ của Nhật Bản là gì?",
        options: ["Won", "Nhân dân tệ", "Bạt", "Yên"],
        correct: 3,
    },
];