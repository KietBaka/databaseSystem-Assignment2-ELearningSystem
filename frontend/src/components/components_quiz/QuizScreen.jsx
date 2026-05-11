// components/components_quiz/QuizScreen.jsx
import React, { useState } from 'react';
import QuizHeader from './QuizHeader';
import ProgressNav from './ProgressNav';
import QuestionCard from './QuestionCard';
import './QuizScreen.css';

const QuizScreen = ({
                        config,
                        randomizedQuestions,
                        currentIndex,
                        answers,
                        formattedTime,
                        timeLeft,
                        answeredCount,
                        toggleOption,
                        goNext,
                        goPrev,
                        goTo,
                        handleSubmit,
                    }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const currentQ = randomizedQuestions[currentIndex];
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === randomizedQuestions.length - 1;

    return (
        <div className="quiz-screen">
            <QuizHeader
                config={config}
                formattedTime={formattedTime}
                timeLeft={timeLeft}
                answeredCount={answeredCount}
                totalQuestions={randomizedQuestions.length}
            />

            <div className="quiz-screen__body">
                <ProgressNav
                    questions={randomizedQuestions}
                    answers={answers}
                    currentIndex={currentIndex}
                    goTo={goTo}
                />

                <main className="quiz-screen__main">
                    <QuestionCard
                        question={currentQ}
                        displayIdx={currentIndex}
                        totalQuestions={randomizedQuestions.length}
                        selectedKeys={answers[currentIndex]}
                        onToggle={toggleOption}
                    />

                    <div className="quiz-screen__nav">
                        <button
                            className="quiz-nav-btn quiz-nav-btn--secondary"
                            onClick={goPrev}
                            disabled={isFirst}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="15 18 9 12 15 6"/>
                            </svg>
                            Câu trước
                        </button>

                        <button
                            className="quiz-nav-btn quiz-nav-btn--submit"
                            onClick={() => setShowConfirm(true)}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            Nộp bài ({answeredCount}/{randomizedQuestions.length})
                        </button>

                        <button
                            className="quiz-nav-btn quiz-nav-btn--primary"
                            onClick={goNext}
                            disabled={isLast}
                        >
                            Câu sau
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="9 18 15 12 9 6"/>
                            </svg>
                        </button>
                    </div>
                </main>
            </div>

            {/* Confirm submit modal */}
            {showConfirm && (
                <div className="quiz-modal-overlay" onClick={() => setShowConfirm(false)}>
                    <div className="quiz-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="quiz-modal__icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="8" x2="12" y2="12"/>
                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                        </div>
                        <h3 className="quiz-modal__title">Xác nhận nộp bài?</h3>
                        <p className="quiz-modal__desc">
                            Bạn đã trả lời <strong>{answeredCount}/{randomizedQuestions.length}</strong> câu hỏi.
                            {answeredCount < randomizedQuestions.length && (
                                <> Còn <strong>{randomizedQuestions.length - answeredCount}</strong> câu chưa trả lời.</>
                            )}
                        </p>
                        <div className="quiz-modal__actions">
                            <button className="quiz-modal__btn quiz-modal__btn--cancel" onClick={() => setShowConfirm(false)}>
                                Tiếp tục làm bài
                            </button>
                            <button
                                className="quiz-modal__btn quiz-modal__btn--confirm"
                                onClick={() => { setShowConfirm(false); handleSubmit(); }}
                            >
                                Nộp bài ngay
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizScreen;