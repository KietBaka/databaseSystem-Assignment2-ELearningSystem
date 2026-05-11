import React, { useState } from 'react';
import mockCourseData from './mockCourseData.js';
import { useNavigate, useParams } from "react-router-dom";
import './CourseDetail.css';

const CourseDetail = () => {
    const { courseId } = useParams(); 
    const navigate = useNavigate();
    
    const foundCourse = mockCourseData.find(course => course.id === courseId);
    
    const [courseData] = useState(foundCourse);
    const [activeTab, setActiveTab] = useState('tong_quan');
    
    if (!courseData) return <div className="loading">Không tìm thấy dữ liệu môn học này!</div>;
    
    const tabs = [
        { id: 'tong_quan', label: 'Tổng quan' },
        { id: 'tai_lieu', label: 'Tài liệu' },
        { id: 'bai_kiem_tra', label: 'Bài kiểm tra' },
        { id: 'sinh_vien', label: 'Sinh viên' }
    ];

    const isTeacher = courseData.role === 'teacher';

    return (
        <div className="course-container">
            {/* Header */}
            <div className="header-back">
                <button className="btn-circle-back" onClick={() => navigate('/dashboard')}>
                    <svg viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                </button>
                <div>
                    <h1 className="course-title">{courseData.name}</h1>
                    <p className="course-id">{courseData.id}</p>
                </div>
            </div>

            {/* Banner */}
            <div className="banner-bk">
                <div className="banner-info">
                    <div className="tag-group">
                        <span className="banner-tag">{courseData.id}</span>
                        <span className="banner-tag">{courseData.department}</span>
                    </div>
                    <h2 className="banner-h2">{courseData.name}</h2>
                    {/* Đổi shortDescription thành description */}
                    <p className="banner-p">{courseData.description}</p>
                </div>
                <div className="banner-meta-grid">
                    <div className="meta-item">
                        <span className="meta-label">Giảng viên</span>
                        {/* Lấy tên giảng viên từ thực thể managed_by */}
                        <span className="meta-val">{courseData.managed_by?.fullname}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">Tín chỉ</span>
                        <span className="meta-val val-lg">{courseData.credits}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">Lịch học</span>
                        <span className="meta-val">{courseData.schedule}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">Học kỳ</span>
                        <span className="meta-val">{courseData.semester}</span>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="tab-navigation">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`tab-link ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="tab-pane">
                
                {/* TỔNG QUAN */}
                {activeTab === 'tong_quan' && (
                    <div className="fade-in">
                        <div className="card-bk">
                            <h3 className="card-bk-title">Mô tả khóa học</h3>
                            <p className="card-bk-content">{courseData.description}</p>
                        </div>
                        {!isTeacher && (
                            <div className="card-bk">
                            <h3 className="card-bk-title">Thông tin chi tiết</h3>
                            <div className="stats-row">
                                <div className="stat-box">
                                    <div className="stat-icon icon-blue"><svg viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg></div>
                                    {/* Thay đổi cách gọi sĩ số sinh viên theo ERD */}
                                    <div><p className="stat-lbl">Sĩ số</p><p className="stat-num">{courseData.num_of_enrolled_students} SV</p></div>
                                </div>
                                {/* Vì ERD không lưu Progress và Điểm TB ở bảng Course, ta có thể hiển thị cố định hoặc tính toán từ GPA sinh viên (tạm để cứng 1 số fallback) */}
                                <div className="stat-box">
                                    <div className="stat-icon icon-green"><svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                                    <div><p className="stat-lbl">Tiến độ cá nhân</p><p className="stat-num">-- %</p></div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-icon icon-yellow"><svg viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg></div>
                                    <div><p className="stat-lbl">Điểm tích lũy</p><p className="stat-num color-yellow">--/10</p></div>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                )}

                {/* TÀI LIỆU (Cập nhật dùng Sections -> Lectures) */}
                {activeTab === 'tai_lieu' && (
                    <div className="fade-in">
                        <div className="card-header-actions mb-3">
                            <h3 className="card-bk-title">Chương trình học</h3>
                            {isTeacher && (
                                <div className="btn-group">
                                    <button className="btn-manage-bk" onClick={()=>navigate("/teacher/MaterialManagement")}>Quản lý</button>
                                </div>
                            )}
                        </div>
                        
                        {courseData.sections?.map(section => (
                            <div key={section.section_order} className="card-bk mb-4">
                                <h4 className="section-title" style={{marginBottom: '16px'}}>
                                    Chương {section.section_order}: {section.name} 
                                    <span className="badge-gray" style={{marginLeft: '8px'}}>{section.num_of_lecture} bài giảng</span>
                                </h4>
                                
                                <div className="list-vertical">
                                    {section.lectures?.map(lec => (
                                        <div key={lec.id} className="list-item-link">
                                            <div className="item-left">
                                                <div className="icon-link-bk"><svg viewBox="0 0 24 24"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg></div>
                                                <div>
                                                    <h4 className="item-name">{lec.title}</h4>
                                                    <p className="item-sub">ID: {lec.id} {lec.date ? `| Ngày: ${lec.date}` : ''}</p>
                                                </div>
                                            </div>
                                            <button className="btn-text-blue" onClick={() => window.open(lec.material_link, '_blank')}>Truy cập</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* BÀI KIỂM TRA (Tính toán điểm tự động từ ATTEMPTS) */}
                {activeTab === 'bai_kiem_tra' && (
                    <div className="fade-in">
                        {isTeacher && (
                            <div className="action-row-end">
                                <button className="btn-manage-bk" onClick={()=>navigate("/teacher/QuizManager")}>Quản lý Quiz</button>
                            </div>
                        )}
                        <div className="list-vertical mt-4">
                            {courseData.quizzes?.map(quiz => {
                                // Tính toán số câu hỏi và số lần đã làm từ dữ liệu thực
                                const qCount = quiz.questions?.length || 0;
                                const attemptsCount = quiz.attempts?.length || 0;
                                // Tính điểm trung bình các lần làm
                                const avgScore = attemptsCount > 0 
                                    ? (quiz.attempts.reduce((sum, att) => sum + att.score, 0) / attemptsCount).toFixed(1)
                                    : '--';

                                return (
                                <div key={quiz.id} className="card-bk quiz-item-flex">
                                    <div className="quiz-main-info">
                                        <div className="quiz-title-row">
                                            <span className={`dot ${attemptsCount > 0 ? 'dot-green' : 'dot-blue'}`}></span>
                                            <h4 className="quiz-h4">{quiz.title}</h4>
                                        </div>
                                        <p className="quiz-p">Mở: {quiz.open_time} - Đóng: {quiz.close_time}</p>
                                        <div className="quiz-badges">
                                            <span className="badge-gray">{quiz.duration} phút</span>
                                            <span className="badge-gray">{qCount} câu hỏi</span>
                                            <span className="badge-gray">Trọng số: {quiz.weight * 100}%</span>
                                        </div>
                                    </div>
                                    <div className="quiz-score-center">
                                        <p className="score-lbl">Điểm TB của bạn</p>
                                        <p className="score-val-blue">{avgScore}</p>
                                        <p className="score-sub">({attemptsCount} / {quiz.max_attempts} lần làm)</p>
                                    </div>
                                    {isTeacher ? (
                                        <button className="btn-white-bk">Chỉnh sửa</button>
                                    ) : (
                                        <button className="btn-manage-bk" onClick={()=>navigate(`/quiz/${quiz.id}`)}>
                                            Làm bài
                                        </button>
                                    )}
                                </div>
                            )})}
                        </div>
                    </div>
                )}

                {/* SINH VIÊN (Sửa s.name thành s.fullname) */}
                {activeTab === 'sinh_vien' && (
                    <div className="card-bk fade-in">
                        <h3 className="card-bk-title">Danh sách sinh viên ({courseData.students?.length || 0})</h3>
                        <div className="student-grid">
                            {courseData.students?.map(s => (
                                <div key={s.id} className="student-item">
                                    <div className="student-left">
                                        <div className="avatar-bk">{s.fullname.charAt(0)}</div>
                                        <div>
                                            <p className="s-name">{s.fullname}</p>
                                            <p className="s-id">MSV: {s.id} | GPA: {s.gpa}</p>
                                        </div>
                                    </div>
                                    <span className="s-status">{s.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseDetail;