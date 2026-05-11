// components/components_quiz/ResultScreen.jsx
import React, { useState,useEffect } from 'react';
import './ResultScreen.css';
import {quizService} from "../../services/quizService.js";
import {useParams,useNavigate} from "react-router-dom";

/**
 * Props:
 *  serverResult – object trả về từ GET /quiz/:quizId/result/:studentId/:attemptOrder
 *  {
 *    totalScore, totalPoints, percentage, attemptOrder, submitTime,
 *    graded: [
 *      {
 *        questionId, displayIdx, question, isMultiple, isCorrect, earned, maxPoints,
 *        options: [{ label, text, isCorrect, isSelected }]
 *      }
 *    ]
 *  }
 */
const ResultScreen = () => {
    const [expandedIdx, setExpandedIdx] = useState(null);
    const [serverResult,setServerResult]=useState(null);
    const [hasError,setHasError]=useState(false);
    const {studentId,quizId,attemptId}=useParams();
    const navigate=useNavigate();
    useEffect(() => {
        async function loadData() {
            try {
                // Đưa try...catch vào BÊN TRONG hàm async
                const result = await quizService.getQuizResult(
                    studentId,
                    quizId,
                    attemptId
                );
                setServerResult(result);
            } catch (e) {
                console.error("Lỗi khi tải kết quả:", e);
                // Cập nhật state để kích hoạt giao diện lỗi
                setHasError(true);
            }
        }

        loadData();
    }, [studentId, quizId, attemptId]); // Nên khai báo các ID vào đây để tránh cảnh báo của ESLint

    if (hasError) {
        return (
            <div className="result-screen result-screen--center">
                <div className="result-screen__warning-box">
                    <h3 className="result-screen__warning-title">🔒 Đáp án chưa được công bố</h3>
                    <p className="result-screen__warning-desc">
                        Bạn đã nộp bài thành công, nhưng hiện tại chưa được phép xem đáp án chi tiết.
                        Vui lòng quay lại sau khi thời gian làm bài kết thúc hoặc khi giảng viên cho phép.
                    </p>
                    {/* Tùy chọn: Thêm nút quay về trang chủ hoặc danh sách bài tập */}
                    <button
                        className="btn-return"
                        onClick={() => navigate(`/quiz/${quizId}`)}
                    >
                        Quay lại trang chủ
                    </button>
                </div>
            </div>
        );
    }


    // ── Loading state ──────────────────────────────────────────────────────
    if (!serverResult) {
        return (
            <div className="result-screen result-screen--center">
                <div className="result-screen__spinner" />
                <p className="result-screen__loading-text">Đang tải kết quả...</p>
            </div>
        );
    }

    const { totalScore, totalPoints, percentage, attemptOrder, submitTime, graded } = serverResult;
    const isPassed     = percentage >= 50;
    const correctCount = graded.filter(g => g.isCorrect).length;
    const wrongCount   = graded.length - correctCount;

    const formattedSubmitTime = submitTime
        ? new Date(submitTime).toLocaleString('vi-VN', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
        })
        : null;

    return (
        <div className="result-screen">
            <div className="result-screen__blob result-screen__blob--1" />
            <div className="result-screen__blob result-screen__blob--2" />

            <div className="result-screen__inner">

                {/* ── Thẻ điểm tổng ── */}
                <div className="result-card">
                    <div className={`result-card__badge ${isPassed ? 'passed' : 'failed'}`}>
                        {isPassed ? (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                                <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                        ) : (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="15" y1="9" x2="9" y2="15"/>
                                <line x1="9" y1="9" x2="15" y2="15"/>
                            </svg>
                        )}
                    </div>

                    <h1 className="result-card__title">
                        {isPassed ? 'Xuất sắc! 🎉' : 'Cần cố gắng hơn'}
                    </h1>

                    <div className="result-card__score-wrap">
                        <div className="result-card__score">{totalScore}</div>
                        <div className="result-card__score-total">/{totalPoints}</div>
                    </div>

                    {/* Vòng tròn % */}
                    <div className="result-card__percent-ring">
                        <svg viewBox="0 0 100 100" width="120" height="120">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--blue-100)" strokeWidth="8"/>
                            <circle
                                cx="50" cy="50" r="42" fill="none"
                                stroke={isPassed ? 'var(--blue-600)' : 'var(--color-error)'}
                                strokeWidth="8"
                                strokeDasharray={`${2 * Math.PI * 42}`}
                                strokeDashoffset={`${2 * Math.PI * 42 * (1 - percentage / 100)}`}
                                strokeLinecap="round"
                                style={{
                                    transformOrigin: 'center',
                                    transform: 'rotate(-90deg)',
                                    transition: 'stroke-dashoffset 1s ease',
                                }}
                            />
                            <text
                                x="50" y="54" textAnchor="middle"
                                fontSize="20" fontWeight="700"
                                fill={isPassed ? 'var(--blue-700)' : 'var(--color-error)'}
                                fontFamily="Lexend, sans-serif"
                            >
                                {percentage}%
                            </text>
                        </svg>
                    </div>

                    <div className="result-card__stats">
                        <div className="result-stat result-stat--correct">
                            <span>{correctCount}</span>
                            <label>Câu đúng</label>
                        </div>
                        <div className="result-stat result-stat--wrong">
                            <span>{wrongCount}</span>
                            <label>Câu sai</label>
                        </div>
                        <div className="result-stat result-stat--total">
                            <span>{graded.length}</span>
                            <label>Tổng câu</label>
                        </div>
                    </div>

                    <div className="result-card__server-note">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Kết quả được chấm bởi hệ thống · Lần nộp #{attemptOrder}
                        {formattedSubmitTime && <> · {formattedSubmitTime}</>}
                    </div>
                </div>

                {/* ── Chi tiết từng câu ── */}
                <div className="result-review">
                    <h2 className="result-review__title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                        </svg>
                        Chi tiết kết quả
                    </h2>

                    {graded.map((g) => {
                        const isExpanded = expandedIdx === g.displayIdx;

                        return (
                            <div
                                key={g.questionId}
                                className={`review-item ${g.isCorrect ? 'correct' : 'wrong'}`}
                            >
                                {/* Header */}
                                <div
                                    className="review-item__header"
                                    onClick={() => setExpandedIdx(isExpanded ? null : g.displayIdx)}
                                >
                                    <span className={`review-item__status-dot ${g.isCorrect ? 'correct' : 'wrong'}`} />
                                    <span className="review-item__q-num">Câu {g.displayIdx + 1}</span>
                                    <span className="review-item__q-text">{g.question}</span>
                                    <span className="review-item__badge-type">
                                        {g.isMultiple ? 'Nhiều đáp án' : 'Một đáp án'}
                                    </span>
                                    <span className="review-item__points">
                                        {g.earned}/{g.maxPoints} đ
                                    </span>
                                    <svg
                                        className={`review-item__chevron ${isExpanded ? 'open' : ''}`}
                                        width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2"
                                    >
                                        <polyline points="6 9 12 15 18 9"/>
                                    </svg>
                                </div>

                                {/* Body */}
                                {isExpanded && (
                                    <div className="review-item__body">
                                        <div className="review-options">
                                            {g.options.map((opt) => {
                                                // Xác định class hiển thị
                                                // isCorrect  + isSelected  → đúng và đã chọn → xanh lá đậm
                                                // isCorrect  + !isSelected → đúng nhưng bỏ lỡ → xanh lá nhạt (outline)
                                                // !isCorrect + isSelected  → sai mà chọn     → đỏ
                                                // !isCorrect + !isSelected → bình thường
                                                let cls = 'review-option';
                                                if (opt.isCorrect && opt.isSelected)  cls += ' review-option--correct-selected';
                                                else if (opt.isCorrect)               cls += ' review-option--correct-missed';
                                                else if (opt.isSelected)              cls += ' review-option--wrong-selected';

                                                return (
                                                    <div key={opt.label} className={cls}>
                                                        <span className="review-option__key">{opt.label}</span>
                                                        <span className="review-option__text">{opt.text}</span>
                                                        <span className="review-option__icons">
                                                            {opt.isCorrect && opt.isSelected && (
                                                                /* Chọn đúng */
                                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                                                     stroke="var(--color-success)" strokeWidth="2.5">
                                                                    <polyline points="20 6 9 17 4 12"/>
                                                                </svg>
                                                            )}
                                                            {opt.isCorrect && !opt.isSelected && (
                                                                /* Đáp án đúng nhưng sinh viên bỏ qua */
                                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                                                     stroke="var(--color-success)" strokeWidth="2.5">
                                                                    <circle cx="12" cy="12" r="10"/>
                                                                    <polyline points="12 8 12 12 14 14"/>
                                                                </svg>
                                                            )}
                                                            {!opt.isCorrect && opt.isSelected && (
                                                                /* Chọn sai */
                                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                                                     stroke="var(--color-error)" strokeWidth="2.5">
                                                                    <line x1="18" y1="6" x2="6" y2="18"/>
                                                                    <line x1="6" y1="6" x2="18" y2="18"/>
                                                                </svg>
                                                            )}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {!g.isCorrect && (
                                            <div className="review-item__hint">
                                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                                                     stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10"/>
                                                    <line x1="12" y1="8" x2="12" y2="12"/>
                                                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                                                </svg>
                                                Đáp án đúng viền xanh lá ·
                                                Đáp án bạn chọn sai viền đỏ
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ResultScreen;