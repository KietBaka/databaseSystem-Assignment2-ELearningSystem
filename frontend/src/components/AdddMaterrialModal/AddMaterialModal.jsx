import React, { useState, useRef } from 'react';
import './AddMaterialModal.css';

const AddMaterialModal = ({ isOpen, onClose, onSubmit }) => {
    const [materialType, setMaterialType] = useState('file');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const fileInputRef = useRef(null);

    // Xử lý khi chọn file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Có thể thêm logic kiểm tra dung lượng (VD: < 50MB) ở đây
            if (file.size > 50 * 1024 * 1024) {
                alert('Tệp quá lớn. Vui lòng chọn tệp dưới 50MB.');
                return;
            }
            setSelectedFile(file);
        }
    };

    // Mở cửa sổ chọn file khi click vào vùng đứt nét
    const handleBoxClick = () => {
        fileInputRef.current.click();
    };

    // Xử lý Submit
    const handleSubmit = async () => {
        if (!title) {
            alert('Vui lòng nhập tiêu đề!');
            return;
        }
        if (materialType === 'file' && !selectedFile) {
            alert('Vui lòng chọn tệp để tải lên!');
            return;
        }

        // Tạo FormData để gửi file và dữ liệu text lên API
        const formData = new FormData();
        formData.append('type', materialType);
        formData.append('title', title);
        formData.append('description', description);
        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        // Gọi hàm onSubmit truyền từ component cha (nơi gọi API)
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Header */}
                <div className="modal-header">
                    <h2>Thêm tài liệu mới</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    {/* Loại tài liệu */}
                    <div className="form-group">
                        <label>Loại tài liệu</label>
                        <select
                            value={materialType}
                            onChange={(e) => setMaterialType(e.target.value)}
                            className="form-control"
                        >
                            <option value="file">Tệp tin</option>
                            <option value="video">Video URL</option>
                            <option value="link">Đường dẫn tham khảo</option>
                        </select>
                    </div>

                    {/* Tiêu đề */}
                    <div className="form-group">
                        <label>Tiêu đề</label>
                        <input
                            type="text"
                            placeholder="Nhập tiêu đề tài liệu"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    {/* Vùng kéo thả File (Chỉ hiện nếu loại là Tệp tin) */}
                    {materialType === 'file' && (
                        <div className="form-group">
                            <label>Tải lên tệp</label>
                            <div className="file-drop-area" onClick={handleBoxClick}>
                                <div className="file-drop-icon">↑</div>
                                {selectedFile ? (
                                    <p className="file-name">Đã chọn: <strong>{selectedFile.name}</strong></p>
                                ) : (
                                    <>
                                        <p>Nhấp để tải lên hoặc kéo thả tệp vào đây</p>
                                        <span className="file-hint">PDF, DOCX, PPTX (Tối đa 50MB)</span>
                                    </>
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                    accept=".pdf,.docx,.pptx"
                                />
                            </div>
                        </div>
                    )}

                    {/* Mô tả */}
                    <div className="form-group">
                        <label>Mô tả (tùy chọn)</label>
                        <textarea
                            placeholder="Nhập mô tả về tài liệu..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control textarea"
                        ></textarea>
                    </div>
                </div>

                {/* Footer / Buttons */}
                <div className="modal-footer">
                    <button className="btn btn-cancel" onClick={onClose}>Hủy</button>
                    <button className="btn btn-submit" onClick={handleSubmit}>Thêm</button>
                </div>
            </div>
        </div>
    );
};

export default AddMaterialModal;