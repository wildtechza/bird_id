"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCentralData } from "../context/CentralDataContext";

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
    // Get available question count based on quiz type
    const availableCount = quizType === "sounds" ? (birdSounds?.length ?? 0) : (birdImages?.length ?? 0);

    // Generate buttons based on available questions
    const questionCountOptions: (number | string)[] = [10, 20, 50].filter(num => num <= availableCount);
    questionCountOptions.push("All");

    setQuestionCountOptions(questionCountOptions);

    if (questionCountOptions.length > 0) {
      setCount(questionCountOptions[0]);
    }
  }, [quizType, birdImages, birdSounds]);

  const questionText = count === "All" ? "ALL questions" : `${count} questions`;

  return (
    <div className="min-h-[100dvh] flex items-start sm:items-center justify-center p-3 sm:p-6 bg-[radial-gradient(circle_at_top_left,rgba(104,160,70,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(76,119,255,0.08),transparent_35%),linear-gradient(135deg,#0d1815,#121f1b)] text-[#f5f7f2]">
      <main className="w-full max-w-[860px] my-auto p-4 sm:p-7 rounded-[24px] sm:rounded-[28px] bg-[rgba(20,31,28,0.82)] border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <h2 className="m-0 mb-3 sm:mb-6 text-center text-[#79b84c] text-xl sm:text-[30px] font-extrabold">
          Ready for a new quiz?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-[22px]">
          {/* Quiz Type Selection */}
          <section className="p-3 sm:p-[18px] rounded-[18px] sm:rounded-[22px] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="mb-2 sm:mb-[14px] text-white/72 text-xs sm:text-sm font-bold uppercase tracking-[0.08em]">
              Quiz Type
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-[14px]">
              <button
                onClick={() => setQuizType("images")}
                className={`h-20 sm:h-[128px] rounded-[16px] sm:rounded-[20px] flex flex-col items-center justify-center gap-1.5 sm:gap-3 text-sm sm:text-xl transition duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${quizType === "images"
                  ? "bg-[linear-gradient(180deg,rgba(121,184,76,0.24),rgba(121,184,76,0.08)),rgba(255,255,255,0.06)] outline outline-2 outline-[rgba(151,216,91,0.7)]"
                  : "bg-white/[0.055] hover:-translate-y-0.5 hover:bg-white/[0.09]"
                  }`}
              >
                <span className="w-10 h-10 sm:w-[66px] sm:h-[66px] rounded-[12px] sm:rounded-[18px] grid place-items-center bg-[rgba(147,214,91,0.18)] text-[#a8e96f]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="sm:w-[34px] sm:h-[34px]">
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                    <circle cx="16.5" cy="8.5" r="1.8" fill="currentColor" />
                    <path d="M5 17l5-5 4 4 2-2 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>Images</span>
              </button>
              <button
                onClick={() => setQuizType("sounds")}
                className={`h-20 sm:h-[128px] rounded-[16px] sm:rounded-[20px] flex flex-col items-center justify-center gap-1.5 sm:gap-3 text-sm sm:text-xl transition duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${quizType === "sounds"
                  ? "bg-[linear-gradient(180deg,rgba(121,184,76,0.24),rgba(121,184,76,0.08)),rgba(255,255,255,0.06)] outline outline-2 outline-[rgba(151,216,91,0.7)]"
                  : "bg-white/[0.055] hover:-translate-y-0.5 hover:bg-white/[0.09]"
                  }`}
              >
                <span className="w-10 h-10 sm:w-[66px] sm:h-[66px] rounded-[12px] sm:rounded-[18px] grid place-items-center bg-[rgba(255,143,21,0.14)] text-[#ff8f15]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="sm:w-[34px] sm:h-[34px]">
                    <rect x="4" y="10" width="3" height="4" rx="1.5" fill="currentColor" />
                    <rect x="9" y="6" width="3" height="12" rx="1.5" fill="currentColor" />
                    <rect x="14" y="3" width="3" height="18" rx="1.5" fill="currentColor" />
                    <rect x="19" y="8" width="3" height="8" rx="1.5" fill="currentColor" />
                  </svg>
                </span>
                <span>Sounds</span>
              </button>
            </div>
          </section>

          {/* Difficulty Selection */}
          <section className="p-3 sm:p-[18px] rounded-[18px] sm:rounded-[22px] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="mb-2 sm:mb-[14px] text-white/72 text-xs sm:text-sm font-bold uppercase tracking-[0.08em]">
              Difficulty
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-[14px]">
              <button
                onClick={() => setDifficulty("beginner")}
                className={`h-20 sm:h-[128px] rounded-[16px] sm:rounded-[20px] flex flex-col items-center justify-center gap-1.5 sm:gap-3 text-sm sm:text-xl transition duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${difficulty === "beginner"
                  ? "bg-[linear-gradient(180deg,rgba(121,184,76,0.24),rgba(121,184,76,0.08)),rgba(255,255,255,0.06)] outline outline-2 outline-[rgba(151,216,91,0.7)]"
                  : "bg-white/[0.055] hover:-translate-y-0.5 hover:bg-white/[0.09]"
                  }`}
              >
                <span className="w-10 h-10 sm:w-[66px] sm:h-[66px] rounded-[12px] sm:rounded-[18px] grid place-items-center bg-[rgba(70,135,255,0.16)] text-[#5d91ff]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="sm:w-[34px] sm:h-[34px]">
                    <rect x="4" y="14" width="4" height="6" rx="1" fill="currentColor" />
                    <rect x="10" y="10" width="4" height="10" rx="1" fill="currentColor" />
                    <rect x="16" y="5" width="4" height="15" rx="1" fill="currentColor" />
                  </svg>
                </span>
                <span>Beginner</span>
              </button>
              <button
                onClick={() => setDifficulty("advanced")}
                className={`h-20 sm:h-[128px] rounded-[16px] sm:rounded-[20px] flex flex-col items-center justify-center gap-1.5 sm:gap-3 text-sm sm:text-xl transition duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${difficulty === "advanced"
                  ? "bg-[linear-gradient(180deg,rgba(121,184,76,0.24),rgba(121,184,76,0.08)),rgba(255,255,255,0.06)] outline outline-2 outline-[rgba(151,216,91,0.7)]"
                  : "bg-white/[0.055] hover:-translate-y-0.5 hover:bg-white/[0.09]"
                  }`}
              >
                <span className="w-10 h-10 sm:w-[66px] sm:h-[66px] rounded-[12px] sm:rounded-[18px] grid place-items-center bg-[rgba(154,82,255,0.16)] text-[#a061ff]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="sm:w-[36px] sm:h-[36px]">
                    <path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.9-5.4 2.9 1-6-4.4-4.3 6.1-.9L12 3z" fill="currentColor" />
                  </svg>
                </span>
                <span>Advanced</span>
              </button>
            </div>
          </section>

          {/* Question Count Selection */}
          <section className="p-3 sm:p-[18px] rounded-[18px] sm:rounded-[22px] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:col-span-2 col-span-1">
            <div className="mb-2 sm:mb-[14px] text-white/72 text-xs sm:text-sm font-bold uppercase tracking-[0.08em]">
              Questions
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-[14px]">
              {questionCountOptions.map((num) => (
                <button
                  key={num}
                  onClick={() => setCount(num)}
                  className={`h-12 sm:h-[78px] rounded-[14px] sm:rounded-[18px] text-base sm:text-2xl font-extrabold transition duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${count === num
                    ? "bg-[linear-gradient(180deg,rgba(154,82,255,0.28),rgba(154,82,255,0.08)),rgba(255,255,255,0.06)] outline outline-2 outline-[rgba(160,97,255,0.8)] text-[#d8c1ff]"
                    : "bg-white/[0.055] hover:-translate-y-0.5 hover:bg-white/[0.09]"
                    }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Start Quiz Button */}
        <button
          onClick={handleStartQuiz}
          className="w-full h-14 sm:h-[92px] mt-3 sm:mt-6 rounded-[20px] sm:rounded-[24px] bg-[linear-gradient(135deg,#76aa48,#4f872f)] text-white text-lg sm:text-[30px] font-extrabold shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_16px_36px_rgba(76,128,47,0.35)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105"
        >
          Start New Quiz
          <span className="ml-4 text-3xl sm:text-4xl">→</span>
        </button>

        {/* Selected Summary */}
        <div className="mt-2 sm:mt-[18px] text-center text-white/68 text-sm">
          Selected:{" "}
          <strong className="text-[#a8e96f] font-bold capitalize">{quizType}</strong>,{" "}
          <strong className="text-[#a8e96f] font-bold capitalize">{difficulty}</strong>,{" "}
          <strong className="text-[#a8e96f] font-bold">{questionText}</strong>
        </div>
      </main>
    </div>
  );
}
