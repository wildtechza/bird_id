"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCentralData } from "../context/CentralDataContext";
import { Card, Section, SelectableButton, PrimaryButton } from "../components/ui";
import { accentGreen, accentLightGreen, buttonBase, selectedPurple, unselected } from "../lib/theme";

export default function Home() {
  const { birdImages, birdSounds } = useCentralData();
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<string>("beginner");
  const [count, setCount] = useState<number | string>(10);
  const [quizType, setQuizType] = useState<string>("images");
  const [questionCountOptions, setQuestionCountOptions] = useState<(number | string)[]>([]);

  const handleStartQuiz = () => {
    router.push(`/quiz?difficulty=${difficulty}&count=${count}&type=${quizType}`);
  };

  useEffect(() => {
    const availableCount = quizType === "sounds" ? (birdSounds?.length ?? 0) : (birdImages?.length ?? 0);
    const options: (number | string)[] = [10, 20, 50].filter(num => num <= availableCount);
    options.push("All");

    setQuestionCountOptions(options);

    if (options.length > 0) {
      setCount(options[0]);
    }
  }, [quizType, birdImages, birdSounds]);

  const questionText = count === "All" ? "ALL questions" : `${count} questions`;

  const selectableBtn =
    "h-20 sm:h-[128px] rounded-[16px] sm:rounded-[20px] flex flex-col items-center justify-center gap-1.5 sm:gap-3 text-sm sm:text-xl";

  return (
    <div className="min-h-[100dvh] flex items-start justify-center p-3 sm:p-6">
      <Card className="p-4 sm:p-7">
        <h2 className={`m-0 mb-3 sm:mb-6 text-center ${accentGreen} text-xl sm:text-[30px] font-extrabold`}>
          Ready for a new quiz?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-[22px]">
          {/* Quiz Type Selection */}
          <Section label="Quiz Type">
            <div className="grid grid-cols-2 gap-2 sm:gap-[14px]">
              <SelectableButton
                selected={quizType === "images"}
                onClick={() => setQuizType("images")}
                className={selectableBtn}
              >
                <span className="w-10 h-10 sm:w-[66px] sm:h-[66px] rounded-[12px] sm:rounded-[18px] grid place-items-center bg-[rgba(91,138,46,0.16)] dark:bg-[rgba(147,214,91,0.18)] text-[#5b8a2e] dark:text-[#a8e96f]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="sm:w-[34px] sm:h-[34px]">
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                    <circle cx="16.5" cy="8.5" r="1.8" fill="currentColor" />
                    <path d="M5 17l5-5 4 4 2-2 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>Images</span>
              </SelectableButton>
              <SelectableButton
                selected={quizType === "sounds"}
                onClick={() => setQuizType("sounds")}
                className={selectableBtn}
              >
                <span className="w-10 h-10 sm:w-[66px] sm:h-[66px] rounded-[12px] sm:rounded-[18px] grid place-items-center bg-[rgba(255,143,21,0.14)] text-[#d97600] dark:text-[#ff8f15]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="sm:w-[34px] sm:h-[34px]">
                    <rect x="4" y="10" width="3" height="4" rx="1.5" fill="currentColor" />
                    <rect x="9" y="6" width="3" height="12" rx="1.5" fill="currentColor" />
                    <rect x="14" y="3" width="3" height="18" rx="1.5" fill="currentColor" />
                    <rect x="19" y="8" width="3" height="8" rx="1.5" fill="currentColor" />
                  </svg>
                </span>
                <span>Sounds</span>
              </SelectableButton>
            </div>
          </Section>

          {/* Difficulty Selection */}
          <Section label="Difficulty">
            <div className="grid grid-cols-2 gap-2 sm:gap-[14px]">
              <SelectableButton
                selected={difficulty === "beginner"}
                onClick={() => setDifficulty("beginner")}
                className={selectableBtn}
              >
                <span className="w-10 h-10 sm:w-[66px] sm:h-[66px] rounded-[12px] sm:rounded-[18px] grid place-items-center bg-[rgba(70,135,255,0.16)] text-[#3b6fe0] dark:text-[#5d91ff]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="sm:w-[34px] sm:h-[34px]">
                    <rect x="4" y="14" width="4" height="6" rx="1" fill="currentColor" />
                    <rect x="10" y="10" width="4" height="10" rx="1" fill="currentColor" />
                    <rect x="16" y="5" width="4" height="15" rx="1" fill="currentColor" />
                  </svg>
                </span>
                <span>Beginner</span>
              </SelectableButton>
              <SelectableButton
                selected={difficulty === "advanced"}
                onClick={() => setDifficulty("advanced")}
                className={selectableBtn}
              >
                <span className="w-10 h-10 sm:w-[66px] sm:h-[66px] rounded-[12px] sm:rounded-[18px] grid place-items-center bg-[rgba(154,82,255,0.16)] text-[#7c3aed] dark:text-[#a061ff]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="sm:w-[36px] sm:h-[36px]">
                    <path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.9-5.4 2.9 1-6-4.4-4.3 6.1-.9L12 3z" fill="currentColor" />
                  </svg>
                </span>
                <span>Advanced</span>
              </SelectableButton>
            </div>
          </Section>

          {/* Question Count Selection */}
          <Section label="Questions" className="sm:col-span-2 col-span-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-[14px]">
              {questionCountOptions.map((num) => (
                <button
                  key={num}
                  onClick={() => setCount(num)}
                  className={`h-12 sm:h-[78px] rounded-[14px] sm:rounded-[18px] text-base sm:text-2xl font-extrabold ${buttonBase} ${count === num ? selectedPurple : unselected}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </Section>
        </div>

        {/* Start Quiz Button */}
        <PrimaryButton
          onClick={handleStartQuiz}
          className="w-full h-14 sm:h-[92px] mt-3 sm:mt-6 rounded-[20px] sm:rounded-[24px] text-lg sm:text-[30px]"
        >
          Start New Quiz
          <span className="text-3xl sm:text-4xl">→</span>
        </PrimaryButton>

        {/* Selected Summary */}
        <div className="mt-2 sm:mt-[18px] text-center text-black/68 dark:text-white/68 text-sm">
          Selected:{" "}
          <strong className={`${accentLightGreen} font-bold capitalize`}>{quizType}</strong>,{" "}
          <strong className={`${accentLightGreen} font-bold capitalize`}>{difficulty}</strong>,{" "}
          <strong className={`${accentLightGreen} font-bold`}>{questionText}</strong>
        </div>
      </Card>
    </div>
  );
}
