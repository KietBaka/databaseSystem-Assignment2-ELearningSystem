import React, { useState } from 'react';
import mockQuizData from './quizData.js';
import './QuizManager.css';

const ManageQuiz = () => {
    const [data, setData] = useState(mockQuizData);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State quản lý luồng "Sửa"
    const [editingQuizId, setEditingQuizId] = useState(null);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);

    const [newQuiz, setNewQuiz] = useState({ title: '', description: '', duration: 30, questions: [] });
    const [draftQuestion, setDraftQuestion] = useState({ content: '', options: ['', ''], correctIndices: [] });

    const getLetter = (index) => String.fromCharCode(65 + index);

    // ==========================================
    // XỬ LÝ CÂU HỎI (TRONG MODAL)
    // ==========================================
    const handleOptionChange = (index, value) => {
        const updatedOptions = [...draftQuestion.options];
        updatedOptions[index] = value;
        setDraftQuestion({ ...draftQuestion, options: updatedOptions });
    };

    const addOption = () => {
        setDraftQuestion({ ...draftQuestion, options: [...draftQuestion.options, ''] });
    };

    const toggleCorrectAnswer = (index) => {
        const currentIndexes = draftQuestion.correctIndices;
        let newIndexes;
        if (currentIndexes.includes(index)) {
            newIndexes = currentIndexes.filter(i => i !== index);
        } else {
            newIndexes = [...currentIndexes, index];
        }
        setDraftQuestion({ ...draftQuestion, correctIndices: newIndexes });
    };

    // Thêm mới HOẶC Cập nhật câu hỏi
    const handleSaveQuestion = () => {
        if (!draftQuestion.content.trim()) return alert("Vui lòng nhập nội dung câu hỏi!");
        if (draftQuestion.options.some(opt => !opt.trim())) return alert("Vui lòng điền đầy đủ nội dung các đáp án!");
        if (draftQuestion.correctIndices.length === 0) return alert("Vui lòng chọn ít nhất 1 đáp án đúng!");

        if (editingQuestionIndex !== null) {
            // Cập nhật câu hỏi hiện tại
            const updatedQuestions = [...newQuiz.questions];
            updatedQuestions[editingQuestionIndex] = { ...draftQuestion };
            setNewQuiz({ ...newQuiz, questions: updatedQuestions });
            setEditingQuestionIndex(null);
        } else {
            // Thêm câu hỏi mới
            setNewQuiz({
                ...newQuiz,
                questions: [...newQuiz.questions, { ...draftQuestion, id: Date.now() }]
            });
        }
        setDraftQuestion({ content: '', options: ['', ''], correctIndices: [] });
    };

    const handleEditQuestion = (index) => {
        setDraftQuestion(newQuiz.questions[index]);
        setEditingQuestionIndex(index);
    };

    const handleDeleteQuestion = (index) => {
        setNewQuiz({
            ...newQuiz,
            questions: newQuiz.questions.filter((_, i) => i !== index)
        });
        if (editingQuestionIndex === index) {
            setEditingQuestionIndex(null);
            setDraftQuestion({ content: '', options: ['', ''], correctIndices: [] });
        }
    };

    // ==========================================
    // XỬ LÝ QUIZ TỔNG THỂ
    // ==========================================
    const handleOpenCreateModal = () => {
        setNewQuiz({ title: '', description: '', duration: 30, questions: [] });
        setDraftQuestion({ content: '', options: ['', ''], correctIndices: [] });
        setEditingQuizId(null);
        setEditingQuestionIndex(null);
        setIsModalOpen(true);
    };

    const handleEditQuiz = (quiz) => {
        setNewQuiz({ ...quiz }); // Clone dữ liệu quiz vào form
        setEditingQuizId(quiz.id);
        setIsModalOpen(true);
    };

    const handleSaveQuiz = () => {
        if (!newQuiz.title.trim()) return alert("Vui lòng nhập tiêu đề Quiz!");
        if (newQuiz.questions.length === 0) return alert("Vui lòng thêm ít nhất 1 câu hỏi!");

        const finalQuiz = {
            id: editingQuizId ? editingQuizId : Date.now(),
            title: newQuiz.title,
            description: newQuiz.description,
            duration: newQuiz.duration,
            questionCount: newQuiz.questions.length,
            questions: newQuiz.questions
        };

        if (editingQuizId) {
            // Cập nhật Quiz đã có
            setData(prev => ({
                ...prev,
                stats: {
                    ...prev.stats,
                    // Cập nhật lại tổng số câu hỏi toàn bộ khóa học
                    totalQuestions: prev.quizzes.reduce((acc, q) => acc + (q.id === editingQuizId ? finalQuiz.questionCount : q.questionCount), 0)
                },
                quizzes: prev.quizzes.map(q => q.id === editingQuizId ? finalQuiz : q)
            }));
        } else {
            // Thêm Quiz mới
            setData(prev => ({
                ...prev,
                stats: {
                    ...prev.stats,
                    totalQuizzes: prev.stats.totalQuizzes + 1,
                    totalQuestions: prev.stats.totalQuestions + finalQuiz.questionCount
                },
                quizzes: [finalQuiz, ...prev.quizzes]
            }));
        }
        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewQuiz({ title: '', description: '', duration: 30, questions: [] });
        setDraftQuestion({ content: '', options: ['', ''], correctIndices: [] });
        setEditingQuizId(null);
        setEditingQuestionIndex(null);
    };

    const handleDeleteQuiz = (id) => {
        if(window.confirm("Bạn có chắc chắn muốn xóa Quiz này không?")) {
            setData(prev => ({
                ...prev,
                stats: {
                    ...prev.stats,
                    totalQuizzes: prev.stats.totalQuizzes - 1,
                    totalQuestions: prev.stats.totalQuestions - prev.quizzes.find(q => q.id === id).questionCount
                },
                quizzes: prev.quizzes.filter(q => q.id !== id)
            }));
        }
    };

    return (
        <div className="mq-container">
            {/* Header */}
            <div className="mq-header">
                <div className="mq-header-left">
                    <button className="mq-btn-back"><svg viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                    <div>
                        <h1 className="mq-title">Quản lý Quiz</h1>
                        <p className="mq-subtitle">{data.courseInfo.name}</p>
                    </div>
                </div>
                <button className="mq-btn-primary" onClick={handleOpenCreateModal}>+ Tạo Quiz mới</button>
            </div>

            {/* Thống kê */}
            <div className="mq-stats-grid">
                <div className="mq-stat-card card-blue">
                    <div>
                        <div className="mq-stat-label">Tổng Quiz</div>
                        <div className="mq-stat-value">{data.stats.totalQuizzes}</div>
                    </div>
                    <svg className="mq-stat-icon" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                </div>
                <div className="mq-stat-card card-teal">
                    <div>
                        <div className="mq-stat-label">Tổng câu hỏi</div>
                        <div className="mq-stat-value">{data.stats.totalQuestions}</div>
                    </div>
                    <svg className="mq-stat-icon" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div className="mq-stat-card card-purple">
                    <div>
                        <div className="mq-stat-label">TB thời gian</div>
                        <div className="mq-stat-value">{data.stats.avgTime} phút</div>
                    </div>
                    <svg className="mq-stat-icon" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
            </div>

            {/* Danh sách Quiz */}
            <div className="mq-list-container">
                <h2 className="mq-section-title">Danh sách Quiz</h2>
                <div className="mq-quiz-list">
                    {data.quizzes.map(quiz => (
                        <div key={quiz.id} className="mq-quiz-item">
                            <div className="mq-quiz-info">
                                <div className="mq-quiz-header-row">
                                    <h3 className="mq-quiz-name">{quiz.title}</h3>
                                    <span className="mq-badge">{quiz.questionCount} câu hỏi</span>
                                </div>
                                <p className="mq-quiz-desc">{quiz.description}</p>
                                <div className="mq-quiz-meta">
                                    <span><svg viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> {quiz.duration} phút</span>
                                </div>
                            </div>
                            <div className="mq-quiz-actions">
                                {/* ĐÃ GẮN SỰ KIỆN SỬA QUIZ VÀO ĐÂY */}
                                <button className="mq-btn-outline" onClick={() => handleEditQuiz(quiz)}>
                                    <svg viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg> Sửa
                                </button>
                                <button className="mq-btn-icon-danger" onClick={() => handleDeleteQuiz(quiz.id)}>
                                    <svg viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                    {data.quizzes.length === 0 && <p className="mq-empty-state">Chưa có Quiz nào. Hãy tạo mới!</p>}
                </div>
            </div>

            {/* MODAL TẠO / SỬA QUIZ */}
            {isModalOpen && (
                <div className="mq-modal-overlay">
                    <div className="mq-modal-content">
                        <div className="mq-modal-header">
                            <h2>{editingQuizId ? "Chỉnh sửa Quiz" : "Tạo Quiz mới"}</h2>
                            <button className="mq-btn-close" onClick={closeModal}>×</button>
                        </div>

                        <div className="mq-modal-body">
                            {/* Thông tin chung */}
                            <div className="mq-form-group">
                                <label>Tiêu đề</label>
                                <input type="text" className="mq-input" placeholder="Nhập tiêu đề quiz" value={newQuiz.title} onChange={e => setNewQuiz({...newQuiz, title: e.target.value})} />
                            </div>
                            <div className="mq-form-group">
                                <label>Mô tả</label>
                                <textarea className="mq-textarea" placeholder="Nhập mô tả quiz" value={newQuiz.description} onChange={e => setNewQuiz({...newQuiz, description: e.target.value})}></textarea>
                            </div>
                            <div className="mq-form-group">
                                <label>Thời gian (phút)</label>
                                <input type="number" className="mq-input" value={newQuiz.duration} onChange={e => setNewQuiz({...newQuiz, duration: parseInt(e.target.value) || 0})} />
                            </div>

                            <hr className="mq-divider" />

                            {/* Khu vực Nhập Câu hỏi */}
                            <div className="mq-question-creator">
                                <h3>{editingQuestionIndex !== null ? "Sửa câu hỏi" : "Thêm câu hỏi mới"}</h3>
                                <div className="mq-form-group mt-3">
                                    <label>Câu hỏi</label>
                                    <textarea className="mq-textarea" placeholder="Nhập câu hỏi" value={draftQuestion.content} onChange={e => setDraftQuestion({...draftQuestion, content: e.target.value})}></textarea>
                                </div>

                                <div className="mq-form-group">
                                    <label>Các đáp án (Có thể thêm nhiều)</label>
                                    <div className="mq-options-grid">
                                        {draftQuestion.options.map((opt, idx) => (
                                            <div key={idx} className="mq-option-input-wrapper">
                                                <span className="mq-option-prefix">Đáp án {getLetter(idx)}</span>
                                                <input type="text" className="mq-input" placeholder={`Nhập nội dung...`} value={opt} onChange={(e) => handleOptionChange(idx, e.target.value)} />
                                            </div>
                                        ))}
                                    </div>
                                    <button className="mq-btn-text mt-2" onClick={addOption}>+ Thêm đáp án khác</button>
                                </div>

                                <div className="mq-form-group">
                                    <label>Đáp án đúng (Có thể chọn nhiều)</label>
                                    <div className="mq-correct-toggles">
                                        {draftQuestion.options.map((_, idx) => (
                                            <button
                                                key={idx}
                                                className={`mq-toggle-btn ${draftQuestion.correctIndices.includes(idx) ? 'active' : ''}`}
                                                onClick={() => toggleCorrectAnswer(idx)}
                                            >
                                                {getLetter(idx)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    className={`mq-btn-outline-full mt-4 ${editingQuestionIndex !== null ? 'update-mode' : ''}`}
                                    onClick={handleSaveQuestion}
                                >
                                    {editingQuestionIndex !== null ? "✓ Cập nhật câu hỏi" : "+ Thêm câu hỏi này vào Quiz"}
                                </button>

                                {editingQuestionIndex !== null && (
                                    <button className="mq-btn-text mt-2" onClick={() => {
                                        setEditingQuestionIndex(null);
                                        setDraftQuestion({ content: '', options: ['', ''], correctIndices: [] });
                                    }}>Hủy sửa câu hỏi</button>
                                )}
                            </div>

                            {/* Danh sách câu hỏi ĐÃ THÊM vào Quiz */}
                            {newQuiz.questions.length > 0 && (
                                <div className="mq-added-questions mt-4">
                                    <h4>Danh sách câu hỏi ({newQuiz.questions.length}):</h4>
                                    <ul className="mq-question-list">
                                        {newQuiz.questions.map((q, idx) => (
                                            <li key={idx} className={`mq-question-list-item ${editingQuestionIndex === idx ? 'editing-active' : ''}`}>
                                                <span className="q-preview"><strong>Câu {idx + 1}:</strong> {q.content.substring(0, 40)}...</span>
                                                <div className="mq-question-actions">
                                                    <button className="mq-btn-text" onClick={() => handleEditQuestion(idx)}>Sửa</button>
                                                    <button className="mq-btn-text text-danger" onClick={() => handleDeleteQuestion(idx)}>Xóa</button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </div>

                        <div className="mq-modal-footer">
                            <button className="mq-btn-cancel" onClick={closeModal}>Hủy</button>
                            <button className="mq-btn-primary" onClick={handleSaveQuiz}>
                                {editingQuizId ? "Lưu thay đổi" : "Tạo Quiz"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageQuiz;