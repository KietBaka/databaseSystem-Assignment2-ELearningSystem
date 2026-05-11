// curriculumData.js
export const initialCurriculum = [
    {
        id: "sec_1",
        title: "Chương 1: Tổng quan về Hệ điều hành",
        order: 1,
        isHidden: false,
        lectures: [
            {
                id: "lec_1",
                title: "1.1 Các khái niệm cơ bản",
                order: 1,
                materials: [
                    { id: "mat_1", type: "pdf", name: "Slide_Chuong1.pdf", link: "#" },
                    { id: "mat_2", type: "video", name: "Video bài giảng tuần 1", link: "#" }
                ]
            },
            {
                id: "lec_2",
                title: "1.2 Cấu trúc máy tính",
                order: 2,
                materials: []
            }
        ]
    },
    {
        id: "sec_2",
        title: "Chương 2: Quản lý Tiến trình (Process)",
        order: 2,
        isHidden: false,
        lectures: [
            {
                id: "lec_3",
                title: "2.1 Trạng thái tiến trình",
                order: 1,
                materials: [{ id: "mat_3", type: "pdf", name: "Process_States.pdf", link: "#" }]
            }
        ]
    }
];