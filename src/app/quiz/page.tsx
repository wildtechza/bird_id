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
        <div className="font-sans flex flex-col min-h-screen px-4 sm:px-8">
            {allDataReady &&
                <main className="flex flex-col gap-4 items-center">
                    <h1 className="text-2xl font-bold">{questionsToAsk.length + 1} Questions to go!</h1>
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
                        <div className="mt-2 text-lg font-semibold text-blue-700">
                            Answer: {correctBird?.fullName || currentQuestion?.answer}
                        </div>
                    )}
                    <div className="flex gap-4">
                        <button
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                            onClick={() => setShowAnswer(true)}
                        >
                            View Answer
                        </button>

                        <button
                            className={`px-4 py-2 text-white rounded bg-blue-600 hover:bg-blue-700`}
                            onClick={askRandomQuestion}
                        >
                            Next
                        </button>
                    </div>
                </main>
            }
            <footer className="flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </div>
    );
}