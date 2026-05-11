import React, { useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext'

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Dữ liệu cho các khóa học chung
  const { courses, isLoading } = useData();
  if (isLoading) {
    return (
      <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Đang tải dữ liệu khóa học... ⏳</h2>
      </div>
    );
  }
  // Dữ liệu cho thanh cuộn bài học trong ngày
  const ongoingLessons = courses
    .filter(course => course.todayLesson)
    .map(course => ({
      id: course.id,
      title: `${course.name} - ${course.todayLesson.title}`,
      startTime: course.todayLesson.start,
      endTime: course.todayLesson.end,
      status: course.todayLesson.status,
      quizzes: 2 // Có thể lấy động nếu bạn thêm vào courseService
    }));
  

  return (
    <div className="dashboard-container">
      <main className="main-content">
        <header className="top-header">
          <h2>Chào mừng trở lại, Kiệt! 👋</h2>
        </header>

        {/* --- THANH CUỘN BÀI HỌC --- */}
        <section className="ongoing-lessons-section">
          <h3>Bài học hôm nay</h3>
          <div className="lessons-scroll-container">
            {ongoingLessons.map(lesson => (
              <div key={lesson.id} className={`lesson-card-horizontal ${lesson.status === 'Đang diễn ra' ? 'active' : ''}`}>
                <div className="lesson-time">
                  <i className="fa-regular fa-clock"></i> {lesson.startTime} - {lesson.endTime}
                </div>
                <div className="lesson-details">
                  <h4>{lesson.title}</h4>
                  <div className="lesson-meta">
                    <span className="quiz-count">
                      <i className="fa-solid fa-list-check"></i> {lesson.quizzes} Quiz
                    </span>
                    <span className={`status-badge ${lesson.status === 'Đang diễn ra' ? 'highlight' : ''}`}>
                      {lesson.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* ------------------------- */}

        <section className="stats">
          <div className="stat-card"><h3>12</h3><p>Khóa học đã tham gia</p></div>
          <div className="stat-card"><h3>85%</h3><p>Tiến độ trung bình</p></div>
          <div className="stat-card"><h3>4</h3><p>Chứng chỉ đã đạt</p></div>
        </section>

        <h3>Khóa học của bạn</h3>
        <div className="course-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-banner" style={{ backgroundColor: course.color || '#4facfe' }}>
                <i className="fa-solid fa-code"></i>
              </div>
              <div className="course-info">
                {/* 1. Đổi course.title thành course.name */}
                <h4>{course.name}</h4> 
                
                {/* 2. Đổi course.teacher thành course.lecturer */}
                <p>Giảng viên: {course.lecturer || 'Đang cập nhật'}</p> 
                
                <div className="course-footer">
                  {/* 3. Lấy số lượng từ block stats */}
                  <span><i className="fa-solid fa-users"></i> {course.stats?.enrolledStudents || 0}</span>
                  
                  <button 
                    className="btn-learn"
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
                    Học tiếp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div> 
      </main>
    </div>
  );
};

export default Dashboard;