"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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

  return (
    <div className="flex flex-col items-center p-4 space-y-4 max-w-md mx-auto">
      <div className="flex flex-col items-center text-xl font-semibold mb-6">
        <Image
          className="mb-4"
          src="/binoculars.svg"
          alt="Bird Id"
          width={100}
          height={180}
          priority
        />
        <span>{birdImages?.length} photos and {birdSounds?.length} calls to identify!</span>
      </div>

      {/* Quiz Type Selection */}
      <div className="w-full">
        <h2 className="text-lg font-semibold mb-3">Quiz Type</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setQuizType("images")}
            className={`flex-1 py-3 rounded-lg transition font-medium ${quizType === "images"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            Images
          </button>
          <button
            onClick={() => setQuizType("sounds")}
            className={`flex-1 py-3 rounded-lg transition font-medium ${quizType === "sounds"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            Sounds
          </button>
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="w-full">
        <h2 className="text-lg font-semibold mb-3">Difficulty</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setDifficulty("beginner")}
            className={`flex-1 py-3 rounded-lg transition font-medium ${difficulty === "beginner"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setDifficulty("advanced")}
            className={`flex-1 py-3 rounded-lg transition font-medium ${difficulty === "advanced"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            Advanced
          </button>
        </div>
      </div>

      {/* Question Count Selection */}
      <div className="w-full">
        <h2 className="text-lg font-semibold mb-3">Number of Questions</h2>
        <div className="flex gap-3">
          {questionCountOptions.map((num) => (
            <button
              key={num}
              onClick={() => setCount(num)}
              className={`flex-1 py-3 rounded-lg transition font-medium ${count === num
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Start Quiz Button */}
      <button
        onClick={handleStartQuiz}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-semibold transition mt-4"
      >
        Start Quiz
      </button>
    </div>
  );
}
