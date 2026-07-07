"use client";

import { useRouter } from "next/navigation";
import { useCentralData } from "../../context/CentralDataContext";
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from "react";
import { QuestionDisplay } from "../../components/QuestionDisplay";
import { Question } from "../../models/Question";
import { Bird } from "../../models/Bird";

export default function Quiz() {
    const router = useRouter();
    const { birdImages, birdSounds, birds } = useCentralData();
    const searchParams = useSearchParams();
    const difficulty = searchParams.get('difficulty') ?? "beginner";
    const countParam = searchParams.get('count') ?? "10";
    const type = searchParams.get('type') ?? "images";
    
    // Determine which question source to use
    const questionSource = type === "sounds" ? birdSounds : birdImages;
    
    // Handle "All" option or parse as number
    const count = countParam === "All" ? (questionSource?.length ?? 0) : parseInt(countParam, 10);

    const [questionsToAsk, setQuestionsToAsk] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);

    const askRandomQuestion = useCallback(() => {
        if (questionsToAsk.length === 0) {
            router.push(`/complete?score=${score}&total=${totalQuestions}`);
            return;
        }
        const idx = Math.floor(Math.random() * questionsToAsk.length);
        const picked = questionsToAsk[idx];
        setCurrentQuestion(picked);
        setQuestionsToAsk(prev => prev.filter((_, i) => i !== idx));
    }, [questionsToAsk, router, score, totalQuestions]);

    useEffect(() => {
        if (questionSource) {
            const temp: Question[] = [];
            while (temp.length < count) {
                const idx = Math.floor(Math.random() * questionSource.length);
                const picked = questionSource[idx];
                if (!temp.find(q => q.answer === picked.answer)) {
                    temp.push(picked);
                }
            }

            setQuestionsToAsk(temp);
            setTotalQuestions(count);
        }
    }, [questionSource, count]);

    useEffect(() => {
        if (questionsToAsk.length > 0 && currentQuestion === null) {
            askRandomQuestion();
        }
    }, [questionsToAsk, currentQuestion, askRandomQuestion]);

    const correctBird =
        currentQuestion && birds?.find(
            (bird: Bird) => String(bird.sabap2) === String(currentQuestion.answer)
        );

    useEffect(() => {
        setShowAnswer(false);
    }, [currentQuestion]);

    const allDataReady = currentQuestion && birds;

    return (
        <div className="min-h-[100dvh] flex items-start justify-center p-4 sm:p-6">
            {allDataReady &&
                <main className="w-full max-w-[860px] p-4 sm:p-5 rounded-[28px] bg-[rgba(20,31,28,0.82)] border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl flex flex-col gap-2.5 sm:gap-3 items-center">
                    <h1 className="m-0 text-center text-[#79b84c] text-xl sm:text-2xl font-extrabold">
                        {questionsToAsk.length + 1} Questions to go!
                    </h1>
                    <QuestionDisplay
                        question={currentQuestion}
                        birds={birds}
                        difficulty={difficulty}
                        onAnswerChecked={(isCorrect) => {
                            if (isCorrect) {
                                setScore(prev => prev + 1);
                            }
                        }}
                    />
                    {showAnswer && (
                        <div className="w-full p-4 sm:p-[18px] rounded-[22px] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] text-center text-lg font-semibold text-[#a8e96f]">
                            Answer: {correctBird?.fullName || currentQuestion?.answer}
                        </div>
                    )}
                    <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-[14px]">
                        <button
                            className="flex-1 h-14 sm:h-[60px] rounded-[18px] bg-white/[0.055] text-white text-lg font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.09]"
                            onClick={() => setShowAnswer(true)}
                        >
                            View Answer
                        </button>

                        <button
                            className="flex-1 h-14 sm:h-[60px] rounded-[18px] bg-[linear-gradient(135deg,#76aa48,#4f872f)] text-white text-lg font-extrabold shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_16px_36px_rgba(76,128,47,0.35)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105"
                            onClick={askRandomQuestion}
                        >
                            Next
                        </button>
                    </div>
                </main>
            }
        </div>
    );
}