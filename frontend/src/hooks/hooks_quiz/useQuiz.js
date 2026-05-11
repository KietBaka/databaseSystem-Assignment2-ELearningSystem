// hooks/hooks_quiz/useQuiz.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { quizService } from '../../services/quizService.js';

/**
 * @param {object|null} config    - Config quiz từ server (null khi đang fetch)
 * @param {object[]}    questions - Câu hỏi đã shuffle từ server
 * @param {number}      studentId - ID sinh viên
 */
const useQuiz = (config, questions, studentId) => {

    const [phase,               setPhase]               = useState('start');
    const [randomizedQuestions, setRandomizedQuestions] = useState([]);
    const [currentIndex,        setCurrentIndex]        = useState(0);
    const [answers,             setAnswers]             = useState({});   // { [displayIdx]: Set<key> }
    const [timeLeft,            setTimeLeft]            = useState(0);
    const [submitError,         setSubmitError]        = useState(null);
    const [isSubmitting,        setIsSubmitting]        = useState(false);

    const timerRef     = useRef(null);
    const startTimeRef = useRef(null);

    // Sync timeLeft khi config thay đổi (lần đầu load xong)
    useEffect(() => {
        if (config) setTimeLeft(config.duration * 60);
    }, [config]);

    // ── Bắt đầu làm bài ──────────────────────────────────────────────────
    const startQuiz = useCallback(() => {
        if (!config) return;
        if (config.attemptCount >= config.maxAttempt) return;

        setRandomizedQuestions(questions); // server đã shuffle sẵn
        setCurrentIndex(0);
        setAnswers({});
        setTimeLeft(config.duration * 60);
        setSubmitError(null);
        startTimeRef.current = new Date().toISOString();
        setPhase('quiz');
    }, [config, questions]);

    // ── Đồng hồ đếm ngược ────────────────────────────────────────────────
    useEffect(() => {
        if (phase !== 'quiz') return;

        timerRef.current = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timerRef.current);
                    handleSubmit();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Chọn / bỏ chọn đáp án ────────────────────────────────────────────
    const toggleOption = useCallback((displayIdx, optionKey) => {
        const q = randomizedQuestions[displayIdx];
        if (!q) return;

        setAnswers(prev => {
            const current = prev[displayIdx] || new Set();
            const next    = new Set(current);

            if (q.isMultiple) {
                next.has(optionKey) ? next.delete(optionKey) : next.add(optionKey);
            } else {
                if (next.has(optionKey)) next.delete(optionKey);
                else { next.clear(); next.add(optionKey); }
            }

            return { ...prev, [displayIdx]: next };
        });
    }, [randomizedQuestions]);

    // ── Điều hướng ───────────────────────────────────────────────────────
    const goNext = useCallback(
        () => setCurrentIndex(i => Math.min(i + 1, randomizedQuestions.length - 1)),
        [randomizedQuestions.length]
    );
    const goPrev = useCallback(
        () => setCurrentIndex(i => Math.max(i - 1, 0)),
        []
    );
    const goTo = useCallback(idx => setCurrentIndex(idx), []);

    // ── Nộp bài ──────────────────────────────────────────────────────────
    const handleSubmit = useCallback(async () => {
        if (isSubmitting || !config) return;
        clearInterval(timerRef.current);
        setIsSubmitting(true);
        setPhase('submitting');

        // Build payload – gửi lại metadata shuffle để server map ngược về label gốc
        const answersPayload = randomizedQuestions.map((rq, displayIdx) => ({
            questionId:           rq.id,
            displayIdx,
            selectedKeys:         [...(answers[displayIdx] || new Set())],
            _shuffledOptionOrder: rq._shuffledOptionOrder,
            _originalOptionOrder: rq._originalOptionOrder,
            _optionPerm:          rq._optionPerm,
        }));

        try {
            // 1. Nộp bài → nhận attemptOrder
            const { attemptOrder } = await quizService.submitQuiz(
                { studentId, startTime: startTimeRef.current, answers: answersPayload },
                config.id
            );
            setPhase('result');
        } catch (err) {
            setSubmitError(err.message);
            setPhase('quiz'); // cho phép thử lại
        } finally {
            setIsSubmitting(false);
        }
    }, [isSubmitting, config, randomizedQuestions, answers, studentId]);

    // ── Computed ──────────────────────────────────────────────────────────
    const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;
    const answeredCount = Object.values(answers).filter(s => s?.size > 0).length;

    return {
        phase,
        randomizedQuestions,
        currentIndex,
        answers,
        timeLeft,
        formattedTime,
        isSubmitting,
        submitError,
        answeredCount,
        totalQuestions:  randomizedQuestions.length,
        currentQuestion: randomizedQuestions[currentIndex],
        startQuiz,
        toggleOption,
        goNext,
        goPrev,
        goTo,
        handleSubmit,
    };
};

export default useQuiz;