// components/components_quiz/StartScreen.jsx
import React from 'react';
import './StartScreen.css';

const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
};

const StartScreen = ({ config, totalQuestions, onStart }) => {
    const infos = [
        {
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            ),
            label: 'Thời gian làm bài',
            value: `${config.duration} phút`,
        },
        {
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
            ),
            label: 'Số câu hỏi',
            value: `${totalQuestions} câu`,
        },
        {
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
            ),
            label: 'Hệ số điểm',
            value: `${(config.weight * 100).toFixed(0)}%`,
        },
        {
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
            ),
            label: 'Số lần làm:',
            value: `${config.attemptCount}/${config.max_attempts} lần`,
        },
        {
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
            ),
            label: 'Hạn nộp',
            value: formatDate(config.close_time),
        },
    ];

    return (
        <div className="start-screen">
            {/* Decorative blob */}
            <div className="start-screen__blob start-screen__blob--1" />
            <div className="start-screen__blob start-screen__blob--2" />

            <div className="start-screen__card">
                <div className="start-screen__icon-wrap">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                </div>

                <div className="start-screen__badge">Bài kiểm tra</div>
                <h1 className="start-screen__title">
                    Môn học <span>{config.co_id?.trim()}</span>
                </h1>
                <p className="start-screen__subtitle">
                    Hãy đọc kỹ câu hỏi trước khi trả lời. Thứ tự câu hỏi và đáp án sẽ được xáo trộn ngẫu nhiên.
                </p>

                <div className="start-screen__infos">
                    {infos.map((info, i) => (
                        <div className="start-screen__info-item" key={i}>
                            <span className="start-screen__info-icon">{info.icon}</span>
                            <div>
                                <div className="start-screen__info-label">{info.label}</div>
                                <div className="start-screen__info-value">{info.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="start-screen__notice">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    Câu hỏi và đáp án sẽ được xáo trộn ngẫu nhiên cho mỗi lần làm bài.
                </div>

                {config.attemptCount<config.maxAttempt ? (
                    <button className="start-screen__btn" onClick={onStart}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                        Bắt đầu làm bài
                    </button>
                ) : (
                    <div className="start-screen__locked">
                        <p>🔒 Bạn đã hết số lần làm bài cho phép.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StartScreen;