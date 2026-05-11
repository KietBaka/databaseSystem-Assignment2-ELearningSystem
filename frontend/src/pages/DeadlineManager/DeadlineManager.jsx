import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext'; 
import './DeadlineManager.css';

const DeadlineManager = () => {
  // Lịch mặc định đang mở ở Tháng 4 năm 2026 (Tháng trong Date bắt đầu từ 0 -> 3 là tháng 4)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); 
  const navigate = useNavigate();
  
  // LẤY TRỰC TIẾP DANH SÁCH KHÓA HỌC TỪ CONTEXT
  const { courses } = useData(); 

  // --- HÀM GOM DỮ LIỆU TỰ ĐỘNG ---
  const getAllDeadlines = () => {
    let allDeadlines = [];
    if (!courses) return allDeadlines;

    courses.forEach(course => {
      // 1. Quét danh sách Quiz
      if (course.quizzes) {
        course.quizzes.forEach(quiz => {
          if (quiz.date) {
            allDeadlines.push({
              id: `quiz_${quiz.id}`,
              title: quiz.title,
              course: course.name,
              courseId: course.id,
              date: normalizeDate(quiz.date), // Chuẩn hóa ngày
              type: 'quiz' // Loại thẻ (để tô màu css)
            });
          }
        });
      }

      // 2. Quét danh sách Bài học/Tài liệu
      if (course.materials) {
        course.materials.forEach(mat => {
          if (mat.date) {
            allDeadlines.push({
              id: `mat_${mat.id}`,
              title: mat.title,
              course: course.name,
              courseId: course.id,
              date: normalizeDate(mat.date), // Chuẩn hóa ngày
              type: 'lesson' // Loại thẻ (để tô màu css)
            });
          }
        });
      }
    });
    return allDeadlines;
  };

  // Hàm chuyển đổi 'DD/MM/YYYY' thành 'YYYY-MM-DD'
  const normalizeDate = (dateStr) => {
    if (dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateStr; // Trả về nguyên gốc nếu đã đúng chuẩn YYYY-MM-DD
  };

  const syncDeadlines = getAllDeadlines(); 

  // --- LOGIC LỊCH ---
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const startingDay = getFirstDayOfMonth(year, month);

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Lọc sự kiện theo ngày
  const getDeadlinesForDay = (day) => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return syncDeadlines.filter(d => d.date === dateString);
  };

  return (
    <div className="deadline-container">
      <div className="deadline-header">
        <h2>Lịch học & Deadline</h2>
        <div className="calendar-controls">
          <button className="btn-month" onClick={handlePrevMonth}>&lt;</button>
          <h3>Tháng {month + 1} Năm {year}</h3>
          <button className="btn-month" onClick={handleNextMonth}>&gt;</button>
        </div>
      </div>

      <div className="calendar-grid">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}

        {Array.from({ length: startingDay }).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-cell empty"></div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dayDeadlines = getDeadlinesForDay(day);

          return (
            <div key={day} className="calendar-cell">
              <span className="day-number">{day}</span>
              <div className="deadline-list">
                {dayDeadlines.map(deadline => (
                  <div 
                    key={deadline.id} 
                    className={`deadline-badge ${deadline.type}`}
                    onClick={() => navigate(`/course/${deadline.courseId}`)}
                    title={`Đi đến môn ${deadline.course}`}
                  >
                    <span className="deadline-title">{deadline.title}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeadlineManager;