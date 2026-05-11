import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth để lấy thông tin người dùng hiện tại
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const { user: authUser } = useAuth(); // Lấy thông tin user (id, role, name, email) từ Context
    
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (!authUser) {
                    setIsLoading(false);
                    return;
                }

                // Giả lập gọi API lấy chi tiết Profile dựa trên Role
                setTimeout(() => {
                    if (authUser.role === 'STUDENT') {
                        // Dữ liệu mô phỏng cho Sinh Viên (Dựa theo ERD: GPA, Credits, Major...)
                        setProfileData({
                            role: 'STUDENT',
                            id: authUser.id,
                            fullname: authUser.name || "Nguyễn Văn A",
                            email: authUser.email || "student@hcmut.edu.vn",
                            department: "Khoa Khoa học và Kỹ thuật Máy tính",
                            major: "Khoa học máy tính", // Từ liên kết Major
                            gpa: "3.5",                 // Thuộc tính của STUDENT
                            earnedCredits: "80",        // Thuộc tính của STUDENT
                            coursesCompleted: "20",     // Thuộc tính của STUDENT
                            avatar: `https://ui-avatars.com/api/?name=${authUser.name || 'Student'}&background=2F65CE&color=fff&size=150`
                        });
                    } else if (authUser.role === 'LECTURER') {
                        // Dữ liệu mô phỏng cho Giảng Viên (Dựa theo ERD: Degree, Teaching Experience...)
                        setProfileData({
                            role: 'LECTURER',
                            id: authUser.id,
                            fullname: authUser.name || "Trương Quỳnh Chi",
                            email: authUser.email || "lecturer@hcmut.edu.vn",
                            department: "Khoa Khoa học và Kỹ thuật Máy tính", // Từ liên kết Work
                            degrees: "Thạc sĩ, Tiến sĩ",                      // Thuộc tính đa trị của LECTURER
                            teachingExperience: "10 năm",                     // Thuộc tính của LECTURER
                            avatar: `https://ui-avatars.com/api/?name=${authUser.name || 'Lecturer'}&background=2DD4BF&color=fff&size=150`
                        });
                    }
                    setIsLoading(false);
                }, 800);

            } catch (err) {
                setError("Không thể kết nối đến máy chủ để lấy thông tin.");
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, [authUser]);

    if (isLoading) return <div className="profile-status">Đang tải dữ liệu...</div>;
    if (error) return <div className="profile-status error">{error}</div>;
    if (!profileData) return <div className="profile-status">Vui lòng đăng nhập để xem hồ sơ.</div>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                
                <div className="profile-header">
                    <img src={profileData.avatar} alt="Avatar" className="profile-avatar" />
                    <div className="profile-title-group">
                        <h2>{profileData.fullname}</h2>
                        <span className="faculty-tag">{profileData.department}</span>
                        <p className="university-name">Trường Đại học Bách Khoa - ĐHQG TP.HCM</p>
                    </div>
                </div>

                <hr className="divider" />

                <div className="profile-body">
                    <div className="info-grid">
                        {/* THÔNG TIN CHUNG (Ai cũng có) */}
                        <div className="info-item">
                            <label>{profileData.role === 'STUDENT' ? 'Mã số sinh viên' : 'Mã số giảng viên'}</label>
                            <span>{profileData.id}</span>
                        </div>
                        <div className="info-item">
                            <label>Email</label>
                            <span>{profileData.email}</span>
                        </div>
                        <div className="info-item">
                            <label>Đơn vị</label>
                            <span>{profileData.department}</span>
                        </div>

                        {/* THÔNG TIN RIÊNG CỦA SINH VIÊN */}
                        {profileData.role === 'STUDENT' && (
                            <>
                                <div className="info-item">
                                    <label>Chuyên ngành</label>
                                    <span>{profileData.major}</span>
                                </div>
                                <div className="info-item">
                                    <label>Số môn đã hoàn thành</label>
                                    <span>{profileData.coursesCompleted} môn</span>
                                </div>
                                <div className="info-item highlight">
                                    <label>GPA Tích Lũy</label>
                                    <span>{profileData.gpa}</span>
                                </div>
                                <div className="info-item highlight">
                                    <label>Tín chỉ tích lũy</label>
                                    <span>{profileData.earnedCredits}</span>
                                </div>
                            </>
                        )}

                        {/* THÔNG TIN RIÊNG CỦA GIẢNG VIÊN */}
                        {profileData.role === 'LECTURER' && (
                            <>
                                <div className="info-item">
                                    <label>Bằng cấp</label>
                                    <span>{profileData.degrees}</span>
                                </div>
                                <div className="info-item highlight">
                                    <label>Kinh nghiệm giảng dạy</label>
                                    <span>{profileData.teachingExperience}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                
                <div className="profile-footer">
                    <button className="btn-edit" onClick={() => navigate('/edit-profile')}>
                        Chỉnh sửa thông tin
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Profile;