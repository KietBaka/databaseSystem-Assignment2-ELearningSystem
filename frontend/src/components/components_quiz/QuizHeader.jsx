// components/components_quiz/QuizHeader.jsx
import React from 'react';
import './QuizHeader.css';

const QuizHeader = ({ config, formattedTime, timeLeft, answeredCount, totalQuestions }) => {
    const totalSeconds = config.duration * 60;
    const progress = (answeredCount / totalQuestions) * 100;
    const timerWarning = timeLeft < 300; // < 5 min
    const timerDanger  = timeLeft < 60;

    return (
        <header className="quiz-header">
            <div className="quiz-header__inner">
                {/* Left: Course info */}
                <div className="quiz-header__left">
                    <div className="quiz-header__badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        eLearning
                    </div>
                    <div className="quiz-header__course">
                        <span className="quiz-header__course-id">{config.co_id?.trim()}</span>
                        <span className="quiz-header__dot">·</span>
                        <span className="quiz-header__label">Bài kiểm tra</span>
                    </div>
                </div>

                {/* Center: Progress */}
                <div className="quiz-header__center">
                    <div className="quiz-header__progress-label">
                        {answeredCount}/{totalQuestions} câu đã trả lời
                    </div>
                    <div className="quiz-header__progress-bar">
                        <div
                            className="quiz-header__progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Right: Timer */}
                <div className={`quiz-header__timer ${timerWarning ? 'warning' : ''} ${timerDanger ? 'danger' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span className="quiz-header__time">{formattedTime}</span>
                    {timerWarning && <span className="quiz-header__timer-pulse" />}
                </div>
            </div>
        </header>
    );
};

export default QuizHeader;