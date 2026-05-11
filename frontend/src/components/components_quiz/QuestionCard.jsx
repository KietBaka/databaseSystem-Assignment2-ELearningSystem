// components/components_quiz/QuestionCard.jsx
import React from 'react';
import './QuestionCard.css';

const QuestionCard = ({ question, displayIdx, totalQuestions, selectedKeys, onToggle }) => {
    if (!question) return null;

    const optionEntries = Object.entries(question.options);
    const selected = selectedKeys || new Set();

    return (
        <div className="question-card">
            {/* Question meta */}
            <div className="question-card__meta">
                <span className="question-card__index">Câu {displayIdx + 1}/{totalQuestions}</span>
                <span className="question-card__points">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
                    {question.points} điểm
        </span>
            </div>

            {/* Question text */}
            <h2 className="question-card__text">{question.question}</h2>

            {/* Type badge */}
            <div className={`question-card__type-badge ${question.isMultiple ? 'multiple' : 'single'}`}>
                {question.isMultiple ? (
                    <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="3" width="4" height="4" rx="0.5"/>
                            <rect x="3" y="10" width="4" height="4" rx="0.5"/>
                            <path d="M9 5h12M9 12h12M9 19h12"/>
                        </svg>
                        Chọn nhiều đáp án ({question.numCorrect} đáp án đúng)
                    </>
                ) : (
                    <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="9"/>
                            <circle cx="12" cy="12" r="4" fill="currentColor"/>
                        </svg>
                        Chọn một đáp án
                    </>
                )}
            </div>

            {/* Options */}
            <div className="question-card__options">
                {optionEntries.map(([key, value]) => {
                    const isSelected = selected.has(key);
                    return (
                        <button
                            key={key}
                            className={`option-btn ${isSelected ? 'selected' : ''}`}
                            onClick={() => onToggle(displayIdx, key)}
                        >
              <span className={`option-btn__key ${isSelected ? 'selected' : ''}`}>
                {question.isMultiple ? (
                    <span className="option-btn__checkbox">
                    {isSelected && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    )}
                  </span>
                ) : (
                    <span className="option-btn__radio">
                    {isSelected && <span className="option-btn__radio-dot" />}
                  </span>
                )}
              </span>
                            <span className="option-btn__label">{key}</span>
                            <span className="option-btn__text">{value}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionCard;