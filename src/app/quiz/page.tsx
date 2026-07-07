"use client";

import { useSearchParams } from 'next/navigation'
import { useQuiz } from "../../hooks/useQuiz";
import { useCentralData } from "../../context/CentralDataContext";
import { QuestionDisplay } from "../../components/QuestionDisplay";
import { Bird } from "../../models/Bird";

export default function Quiz() {
    const searchParams = useSearchParams();
    const difficulty = searchParams.get('difficulty') ?? "beginner";
    const countParam = searchParams.get('count') ?? "10";
    const type = searchParams.get('type') ?? "images";

    const { birds } = useCentralData();
    const { currentQuestion, remaining, showAnswer, ready, next, revealAnswer, recordAnswer } = useQuiz({ type, countParam });

    const correctBird =
        currentQuestion && birds?.find(
            (bird: Bird) => String(bird.sabap2) === String(currentQuestion.answer)
        );

    return (
        <div className="min-h-[100dvh] flex items-start justify-center p-4 sm:p-6">
            {ready &&
                <main className="w-full max-w-[860px] p-4 sm:p-5 rounded-[28px] bg-white border border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.12)] dark:bg-[rgba(20,31,28,0.82)] dark:border-white/12 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl flex flex-col gap-2.5 sm:gap-3 items-center">
                    <h1 className="m-0 text-center text-[#5b8a2e] dark:text-[#79b84c] text-xl sm:text-2xl font-extrabold">
                        {remaining + 1} Questions to go!
                    </h1>
                    <QuestionDisplay
                        question={currentQuestion!}
                        birds={birds!}
                        difficulty={difficulty}
                        onAnswerChecked={recordAnswer}
                    />
                    {showAnswer && (
                        <div className="w-full p-4 sm:p-[18px] rounded-[22px] bg-black/[0.04] dark:bg-white/[0.035] shadow-[inset_0_1px_0_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] text-center text-lg font-semibold text-[#5b8a2e] dark:text-[#a8e96f]">
                            Answer: {correctBird?.fullName || currentQuestion?.answer}
                        </div>
                    )}
                    <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-[14px]">
                        <button
                            className="flex-1 h-14 sm:h-[60px] rounded-[18px] bg-black/[0.05] text-[#171717] dark:bg-white/[0.055] dark:text-white text-lg font-bold shadow-[inset_0_1px_0_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-200 hover:-translate-y-0.5 hover:bg-black/[0.08] dark:hover:bg-white/[0.09]"
                            onClick={revealAnswer}
                        >
                            View Answer
                        </button>

                        <button
                            className="flex-1 h-14 sm:h-[60px] rounded-[18px] bg-[linear-gradient(135deg,#76aa48,#4f872f)] text-white text-lg font-extrabold shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_16px_36px_rgba(76,128,47,0.35)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105"
                            onClick={next}
                        >
                            Next
                        </button>
                    </div>
                </main>
            }
        </div>
    );
}
