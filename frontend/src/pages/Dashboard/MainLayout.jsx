import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // 1. IMPORT useAuth ở đây
import './MainLayout.css';

const MainLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // 2. LẤY user và hàm logout từ Context

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // 3. CẬP NHẬT HÀM ĐĂNG XUẤT
  const handleConfirmLogout = () => {
    logout(); // Gọi hàm logout để xóa localStorage và state
    setShowLogoutModal(false); // Đóng modal
    navigate('/'); // Chuyển về trang đăng nhập
  };

  return (
    <div className={`dashboard-container ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <i className="fa-solid fa-graduation-cap"></i>
          <span className="sidebar-header-text">67ELEARNING</span>
        </div>
        
        <nav>
          {/* MENU CHUNG AI CŨNG THẤY */}
          <NavLink to="/profile" className="nav-item">
            <i className="fa-solid fa-user"></i> <span>Hồ sơ</span>
          </NavLink>

          {/* MENU DÀNH RIÊNG CHO SINH VIÊN */}
          {user?.role === 'STUDENT' && (
            <>
              <NavLink to="/dashboard" className="nav-item">
                <i className="fa-solid fa-house"></i> <span>Trang chủ</span>
              </NavLink>
              <NavLink to="/deadlines" className="nav-item">
                <i className="fa-solid fa-book"></i> <span>Lịch</span>
              </NavLink>
            </>
          )}

          {/* MENU DÀNH RIÊNG CHO GIÁO VIÊN */}
          {user?.role === 'LECTURER' && (
            <>
              <NavLink to="/lecturer-dashboard" className="nav-item">
                <i className="fa-solid fa-chalkboard-user"></i> <span>Quản lý Khóa học</span>
              </NavLink>
              <NavLink to="/curriculum-manager" className="nav-item">
                <i className="fa-solid fa-folder-open"></i> <span>Nội dung bài giảng</span>
              </NavLink>
              <NavLink to="/quiz-manager" className="nav-item">
                <i className="fa-solid fa-file-signature"></i> <span>Ngân hàng Quiz</span>
              </NavLink>
            </>
          )}

          {/* NÚT ĐĂNG XUẤT (Giữ nguyên cấu trúc của bạn) */}
          <div 
              className={`nav-item logout ${showLogoutModal ? 'active' : ''}`} 
              onClick={() => setShowLogoutModal(true)}
            >
              <i className="fa-solid fa-right-from-bracket"></i> <span>Đăng xuất</span>
          </div>
        </nav>
      </aside>

      <main className="main-content">
        {/* Nút toggle nằm ở đây để điều khiển sidebar */}
        <button className="toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <i className={`fa-solid ${isSidebarOpen ? 'fa-bars-staggered' : 'fa-bars'}`}></i>
        </button>

        {/* CỰC KỲ QUAN TRỌNG: Nơi các trang con hiện ra */}
        <Outlet /> 
      </main>

      {/* MODAL ĐĂNG XUẤT (Giữ nguyên cấu trúc) */}
      {showLogoutModal && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Xác nhận đăng xuất</h3>
          <p>Bạn có chắc là muốn đăng xuất?</p>
          <div className="modal-buttons">
            <button className="btn-cancel" onClick={() => setShowLogoutModal(false)}>
                  Hủy
            </button>
            <button className="btn-confirm-logout" onClick={handleConfirmLogout}>
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default MainLayout;