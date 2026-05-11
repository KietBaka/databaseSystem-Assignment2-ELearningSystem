// pages/Quiz/Quiz.jsx
import React, { useState, useEffect } from 'react';
import useQuiz from '../../hooks/hooks_quiz/useQuiz';
import StartScreen  from '../../components/components_quiz/StartScreen';
import QuizScreen   from '../../components/components_quiz/QuizScreen';
import ResultScreen from './ResultScreen.jsx';
import { quizService } from '../../services/quizService.js';
import '../../pages/Quiz/tokens.css';
import {useParams,useNavigate} from "react-router-dom";
/**
 * Props:
 *   quizId    – ID bài thi (từ router params)
 *   studentId – ID sinh viên đang đăng nhập (từ auth context)
 */
const Quiz = () => {
    const {quizId} = useParams();
    const studentId = 4;
    console.log(quizId);

    const [config,     setConfig]     = useState(null);
    const [questions,  setQuestions]  = useState([]);
    const [loading,    setLoading]    = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const navigate=useNavigate();

    // ── Lấy dữ liệu quiz khi mount ────────────────────────────────────────
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const data = await quizService.getQuizData(studentId, quizId);
                setConfig(data.config);
                setQuestions(data.questions);
            } catch (err) {
                setFetchError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [quizId, studentId]);

    const quiz = useQuiz(config, questions, studentId);

    // ── Loading / Error ───────────────────────────────────────────────────
    if (loading)    return <FullPageSpinner text="Đang tải đề thi..." />;
    if (fetchError) return <FullPageError   text={fetchError} />;

    // ── Submitting ────────────────────────────────────────────────────────
    if (quiz.phase === 'submitting') return <FullPageSpinner text="Đang nộp bài..." />;

    // ── Start ─────────────────────────────────────────────────────────────
    if (quiz.phase === 'start') {
        return (
            <StartScreen
                config={config}
                totalQuestions={questions.length}
                onStart={quiz.startQuiz}
            />
        );
    }

    // ── Quiz ──────────────────────────────────────────────────────────────
    if (quiz.phase === 'quiz') {
        return (
            <QuizScreen
                config={config}
                randomizedQuestions={quiz.randomizedQuestions}
                currentIndex={quiz.currentIndex}
                answers={quiz.answers}
                formattedTime={quiz.formattedTime}
                timeLeft={quiz.timeLeft}
                answeredCount={quiz.answeredCount}
                submitError={quiz.submitError}
                toggleOption={quiz.toggleOption}
                goNext={quiz.goNext}
                goPrev={quiz.goPrev}
                goTo={quiz.goTo}
                handleSubmit={quiz.handleSubmit}
            />
        );
    }

    // ── Result ────────────────────────────────────────────────────────────
    if (quiz.phase === 'result') {
        navigate(`/quiz_attempt_result/${studentId}/${config.id}/${config.attemptCount+1}`);
    }

    return null;
};

// ── Shared UI helpers ─────────────────────────────────────────────────────
const FullPageSpinner = ({ text }) => (
    <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#f8faff', gap: 16,
    }}>
        <div style={{
            width: 56, height: 56,
            border: '4px solid #dbeafe',
            borderTop: '4px solid #2563eb',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ fontFamily: "'Lexend',sans-serif", color: '#2563eb', fontWeight: 600 }}>
            {text}
        </p>
    </div>
);

const FullPageError = ({ text }) => (
    <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#f8faff',
    }}>
        <p style={{ color: '#ef4444', fontFamily: "'Lexend',sans-serif", fontWeight: 600 }}>
            Lỗi: {text}
        </p>
    </div>
);

export default Quiz;