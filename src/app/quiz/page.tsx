"use client";

import { useSearchParams } from 'next/navigation'
import { useQuiz } from "../../hooks/useQuiz";
import { useCentralData } from "../../context/CentralDataContext";
import { QuestionDisplay } from "../../components/QuestionDisplay";
import { Card, PrimaryButton, GhostButton } from "../../components/ui";
import { section, accentGreen, accentLightGreen } from "../../lib/theme";
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
        <div className="flex items-start justify-center p-4 sm:p-6">
            {ready && (
                <Card className="p-4 sm:p-5 rounded-[28px] flex flex-col gap-2.5 sm:gap-3 items-center">
                    <h1 className={`m-0 text-center ${accentGreen} text-xl sm:text-2xl font-extrabold`}>
                        {remaining + 1} Questions to go!
                    </h1>
                    <QuestionDisplay
                        question={currentQuestion!}
                        birds={birds!}
                        difficulty={difficulty}
                        onAnswerChecked={recordAnswer}
                    />
                    {showAnswer && (
                        <div className={`w-full px-4 py-2 sm:px-[18px] sm:py-2.5 rounded-[18px] ${section} text-center text-base sm:text-lg font-semibold ${accentLightGreen}`}>
                            Answer: {correctBird?.fullName || currentQuestion?.answer}
                        </div>
                    )}
                    <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-[14px]">
                        {!showAnswer && (
                            <GhostButton
                                onClick={revealAnswer}
                                className="flex-1 h-14 sm:h-[60px] rounded-[18px] text-lg"
                            >
                                View Answer
                            </GhostButton>
                        )}
                        <PrimaryButton
                            onClick={next}
                            className="flex-1 h-14 sm:h-[60px] rounded-[18px] text-lg"
                        >
                            Next
                        </PrimaryButton>
                    </div>
                </Card>
            )}
        </div>
    );
}
