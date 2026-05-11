import React, { useState } from 'react';
import './MaterialManager.css';
import mockMaterials from "./MockMaterials.js";
import AddMaterialModal from "../../components/AdddMaterrialModal/AddMaterialModal.jsx";
// Import Modal bạn đã làm ở bước trước
// import AddMaterialModal from './AddMaterialModal';

const MaterialManager = () => {
    const [materials, setMaterials] = useState(mockMaterials);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Xử lý khi modal trả về dữ liệu
    const handleAddMaterial = (formData) => {
        console.log("Dữ liệu nhận được từ Modal:", Object.fromEntries(formData));
        // Logic gọi API để thêm mới sẽ nằm ở đây
        // Sau khi thêm thành công, đóng modal và load lại danh sách
        setIsAddModalOpen(false);
    };

    // Đếm thống kê
    const totalMaterials = materials.length;
    const totalFiles = materials.filter(m => m.type === 'file').length;
    const totalVideos = materials.filter(m => m.type === 'video').length;

    return (
        <div className="material-dashboard">
            {/* --- Header --- */}
            <div className="dashboard-header">
                <div className="header-left">
                    <button className="btn-back">←</button>
                    <div>
                        <h1 className="page-title">Quản lý tài liệu</h1>
                        <p className="page-subtitle">Nhập môn Lập trình</p>
                    </div>
                </div>
                <button
                    className="btn-add-primary"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    + Thêm tài liệu
                </button>
            </div>

            {/* --- Thẻ Thống Kê --- */}
            <div className="stats-container">
                <div className="stat-card card-blue">
                    <div className="stat-info">
                        <span className="stat-label">Tổng tài liệu</span>
                        <span className="stat-value">{totalMaterials}</span>
                    </div>
                    <div className="stat-icon">📄</div>
                </div>

                <div className="stat-card card-teal">
                    <div className="stat-info">
                        <span className="stat-label">Tệp tin</span>
                        <span className="stat-value">{totalFiles}</span>
                    </div>
                    <div className="stat-icon">📤</div>
                </div>

                <div className="stat-card card-purple">
                    <div className="stat-info">
                        <span className="stat-label">Video</span>
                        <span className="stat-value">{totalVideos}</span>
                    </div>
                    <div className="stat-icon">🎥</div>
                </div>
            </div>

            {/* --- Danh Sách Tài Liệu --- */}
            <div className="list-container">
                <h2 className="list-title">Danh sách tài liệu</h2>

                <div className="material-list">
                    {materials.map((item) => (
                        <div key={item.id} className="material-item">

                            {/* Icon bên trái */}
                            <div className={`item-icon-wrapper ${item.type === 'file' ? 'bg-blue-light' : 'bg-purple-light'}`}>
                                {item.type === 'file' ? '📄' : '🎥'}
                            </div>

                            {/* Thông tin ở giữa */}
                            <div className="item-content">
                                <div className="item-header">
                                    <h3 className="item-title">{item.title}</h3>
                                    <span className={`item-tag ${item.type === 'file' ? 'tag-gray' : 'tag-blue'}`}>
                                        {item.type === 'file' ? 'Tệp tin' : 'Video'}
                                    </span>
                                </div>
                                <p className="item-desc">{item.description}</p>
                                <p className="item-meta">
                                    {item.date} {item.size && `• ${item.size}`}
                                </p>
                            </div>

                            {/* Các nút hành động bên phải */}
                            <div className="item-actions">
                                {item.type === 'video' && (
                                    <a href={item.link} className="action-link">
                                        🔗 Xem
                                    </a>
                                )}
                                <button className="btn-icon" title="Sửa">✏️</button>
                                <button className="btn-icon btn-delete" title="Xóa">🗑️</button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            {/* Gọi Component Modal */}
            <AddMaterialModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddMaterial}
            />

        </div>
    );
};

export default MaterialManager;