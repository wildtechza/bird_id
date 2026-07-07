"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCentralData } from "../context/CentralDataContext";
import { Question } from "../models/Question";
import { pickRandomQuestions, resolveCount } from "../lib/quiz";

export interface UseQuizParams {
    type: string;
    countParam: string;
}

export interface UseQuizResult {
    /** The question currently being displayed, or null while loading. */
    currentQuestion: Question | null;
    /** Number of questions remaining (including the current one). */
    remaining: number;
    /** Total questions in this quiz run. */
    totalQuestions: number;
    /** Current score. */
    score: number;
    /** Whether the "View Answer" reveal is open. */
    showAnswer: boolean;
    /** True once the current question and bird data are ready to render. */
    ready: boolean;
    /** Advance to the next question (or navigate to /complete when done). */
    next: () => void;
    /** Reveal the answer panel. */
    revealAnswer: () => void;
    /** Record whether the latest answer was correct. */
    recordAnswer: (isCorrect: boolean) => void;
}

/**
 * Encapsulates quiz session state: question selection, scoring,
 * answer reveal, and navigation to the completion screen.
 */
export function useQuiz({ type, countParam }: UseQuizParams): UseQuizResult {
    const router = useRouter();
    const { birdImages, birdSounds, birds } = useCentralData();

    const questionSource = type === "sounds" ? birdSounds : birdImages;
    const count = resolveCount(countParam, questionSource?.length ?? 0);

    const [questionsToAsk, setQuestionsToAsk] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);

    // Build the question set once the source data is available.
    useEffect(() => {
        if (!questionSource) return;

        setQuestionsToAsk(pickRandomQuestions(questionSource, count));
        setTotalQuestions(count);
    }, [questionSource, count]);

    // Pick the first question once the set is ready.
    useEffect(() => {
        if (questionsToAsk.length > 0 && currentQuestion === null) {
            askNext();
        }
    }, [questionsToAsk, currentQuestion]);

    // Reset the answer reveal whenever the question changes.
    useEffect(() => {
        setShowAnswer(false);
    }, [currentQuestion]);

    const askNext = useCallback(() => {
        setQuestionsToAsk((prev) => {
            if (prev.length === 0) {
                router.push(`/complete?score=${score}&total=${totalQuestions}`);
                return prev;
            }
            const idx = Math.floor(Math.random() * prev.length);
            setCurrentQuestion(prev[idx]);
            return prev.filter((_, i) => i !== idx);
        });
    }, [router, score, totalQuestions]);

    const next = useCallback(() => {
        askNext();
    }, [askNext]);

    const revealAnswer = useCallback(() => setShowAnswer(true), []);

    const recordAnswer = useCallback((isCorrect: boolean) => {
        if (isCorrect) setScore((prev) => prev + 1);
    }, []);

    return {
        currentQuestion,
        remaining: questionsToAsk.length,
        totalQuestions,
        score,
        showAnswer,
        ready: Boolean(currentQuestion && birds),
        next,
        revealAnswer,
        recordAnswer,
    };
}
