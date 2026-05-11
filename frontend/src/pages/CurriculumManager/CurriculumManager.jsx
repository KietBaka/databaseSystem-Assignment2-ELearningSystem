import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Plus, FileText, Video, Eye, EyeOff, Edit3, Trash2 } from 'lucide-react';
import { initialCurriculum } from './curriculumData';
import './CurriculumManager.css';

const CurriculumManager = () => {
    const [sections, setSections] = useState(initialCurriculum);

    // Hàm xử lý khi kết thúc hành động kéo thả
    const handleDragEnd = (result) => {
        if (!result.destination) return; // Kéo thả ra ngoài vùng cho phép

        const items = Array.from(sections);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Cập nhật lại state (Sau này bạn sẽ gọi API PUT để cập nhật trường 'order' trong Database)
        setSections(items);
    };

    const toggleVisibility = (sectionId) => {
        setSections(sections.map(sec =>
            sec.id === sectionId ? { ...sec, isHidden: !sec.isHidden } : sec
        ));
    };

    return (
        <div className="curriculum-container">
            <div className="curriculum-header">
                <div>
                    <h2>Quản lý Nội dung học tập</h2>
                    <p>Kéo thả các chương để thay đổi thứ tự hiển thị với sinh viên.</p>
                </div>
                <button className="btn-add-section">
                    <Plus size={18} /> Thêm Chương mới
                </button>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="curriculum-sections">
                    {(provided) => (
                        <div
                            className="sections-list"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {sections.map((section, index) => (
                                <Draggable key={section.id} draggableId={section.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            className={`section-card ${snapshot.isDragging ? 'is-dragging' : ''} ${section.isHidden ? 'is-hidden' : ''}`}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                        >
                                            {/* Header của Chương */}
                                            <div className="section-header">
                                                <div className="section-title-wrapper">
                                                    <div {...provided.dragHandleProps} className="drag-handle">
                                                        <GripVertical size={20} />
                                                    </div>
                                                    <h3>{section.title}</h3>
                                                    {section.isHidden && <span className="badge-hidden">Đang ẩn</span>}
                                                </div>

                                                <div className="section-actions">
                                                    <button onClick={() => toggleVisibility(section.id)} className="icon-btn" title="Ẩn/Hiện chương">
                                                        {section.isHidden ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                    <button className="icon-btn text-blue"><Edit3 size={18} /></button>
                                                    <button className="icon-btn text-red"><Trash2 size={18} /></button>
                                                </div>
                                            </div>

                                            {/* Danh sách Bài giảng trong Chương */}
                                            <div className="lectures-list">
                                                {section.lectures.map((lecture) => (
                                                    <div key={lecture.id} className="lecture-item">
                                                        <div className="lecture-info">
                                                            <FileText size={16} className="text-gray" />
                                                            <span className="lecture-title">{lecture.title}</span>
                                                        </div>

                                                        {/* Tài liệu đính kèm */}
                                                        {lecture.materials.length > 0 && (
                                                            <div className="materials-list">
                                                                {lecture.materials.map(mat => (
                                                                    <a key={mat.id} href={mat.link} className="material-badge">
                                                                        {mat.type === 'pdf' ? <FileText size={12}/> : <Video size={12}/>}
                                                                        {mat.name}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        )}

                                                        <div className="lecture-actions">
                                                            <button className="btn-small">+ Thêm tài liệu</button>
                                                        </div>
                                                    </div>
                                                ))}

                                                <button className="btn-add-lecture">
                                                    <Plus size={16} /> Thêm Bài giảng (Lecture)
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default CurriculumManager;