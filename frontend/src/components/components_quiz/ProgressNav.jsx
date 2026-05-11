// components/components_quiz/ProgressNav.jsx
import React from 'react';
import './ProgressNav.css';

const ProgressNav = ({ questions, answers, currentIndex, goTo }) => {
    return (
        <aside className="progress-nav">
            <div className="progress-nav__title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="3" width="7" height="7" rx="1"/>
                    <rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/>
                    <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
                Câu hỏi
            </div>

            <div className="progress-nav__grid">
                {questions.map((_, idx) => {
                    const isAnswered = (answers[idx]?.size || 0) > 0;
                    const isCurrent = idx === currentIndex;

                    return (
                        <button
                            key={idx}
                            className={`progress-nav__btn
                ${isCurrent  ? 'current'  : ''}
                ${isAnswered && !isCurrent ? 'answered' : ''}
              `}
                            onClick={() => goTo(idx)}
                            title={`Câu ${idx + 1}${isAnswered ? ' (đã trả lời)' : ''}`}
                        >
                            {idx + 1}
                            {isAnswered && !isCurrent && (
                                <span className="progress-nav__check">
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="progress-nav__legend">
        <span className="progress-nav__legend-item">
          <span className="dot dot--current" /> Hiện tại
        </span>
                <span className="progress-nav__legend-item">
          <span className="dot dot--answered" /> Đã trả lời
        </span>
                <span className="progress-nav__legend-item">
          <span className="dot dot--empty" /> Chưa trả lời
        </span>
            </div>
        </aside>
    );
};

export default ProgressNav;