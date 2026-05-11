import React from 'react';
import './LecturerDashboard.css';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext'; // Import DataContext
import { useAuth } from '../../context/AuthContext'; // Import AuthContext

const LecturerDashboard = () => {
    const navigate = useNavigate();
    
    // 1. LẤY DỮ LIỆU ĐỒNG BỘ
    const { courses } = useData();
    const { user } = useAuth();

    // 2. Lọc danh sách khóa học DO GIẢNG VIÊN NÀY phụ trách
    const myCourses = courses.filter(course => course.lecturerId === user?.id);

    // 3. Tính toán thống kê tự động
    const totalStudents = myCourses.reduce((sum, course) => sum + (course.stats?.enrolledStudents || 0), 0);
    const pendingGrades = 15; // Giả lập số bài cần chấm

    return (
        <div className="dashboard-container">
            {/* Main Content Area */}
            <main className="main-content">
                <header className="content-header">
                    <h2>Chào mừng trở lại, {user?.name || 'Thầy/Cô'}! 👋</h2>
                    <div className="avatar-circle">{user?.name ? user.name.charAt(0) : 'G'}</div>
                </header>

                {/* Bảng thống kê (Stats) */}
                <section className="stats-grid">
                    <div className="stat-card">
                        <h3>{myCourses.length}</h3>
                        <p>Khóa học phụ trách</p>
                    </div>
                    <div className="stat-card">
                        <h3>{totalStudents}</h3>
                        <p>Tổng sinh viên</p>
                    </div>
                    <div className="stat-card alert-card">
                        <h3>{pendingGrades}</h3>
                        <p>Bài tập chờ chấm điểm</p>
                    </div>
                </section>

                {/* Danh sách khóa học */}
                <section className="courses-section">
                    <div className="section-header">
                        <h3>Khóa học của bạn</h3>
                        <button className="btn-primary">+ Tạo khóa học mới</button>
                    </div>

                    <div className="courses-grid">
                        {myCourses.map(course => (
                            <div className="course-card" key={course.id}>
                                <div className="course-info">
                                    <h4>{course.name}</h4>
                                    <p className="course-id">Mã môn: {course.id}</p>
                                    <p className="course-students">👥 {course.stats?.enrolledStudents || 0} Sinh viên</p>
                                </div>
                                <div className="course-actions">
                                    <button 
                                        className="btn-secondary"
                                        onClick={() => navigate(`/curriculum-manager/${course.id}`)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Quản lý nội dung
                                    </button>
                                    <button 
                                        className="btn-secondary"
                                        onClick={() => navigate(`/quiz-manager/${course.id}`)}
                                    >
                                        Ngân hàng Quiz
                                    </button>
                                </div>
                            </div>
                        ))}
                        {myCourses.length === 0 && <p>Bạn chưa phụ trách khóa học nào.</p>}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LecturerDashboard;