"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCentralData } from "../context/CentralDataContext";

export default function Home() {
  const { birdImages } = useCentralData();
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<string>("beginner");
  const [count, setCount] = useState<number>(10);

  const handleStartQuiz = () => {
    router.push(`/quiz?difficulty=${difficulty}&count=${count}`);
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 max-w-md mx-auto">
      <div className="flex flex-col items-center text-xl font-semibold mb-2">
        <Image
          className="mb-4"
          src="/binoculars.svg"
          alt="Bird Id"
          width={100}
          height={180}
          priority
        />
        <span>{birdImages?.length} birds to identify!</span>
      </div>

      <h1 className="text-2xl font-bold">Choose Your Quiz</h1>

      {/* Difficulty Selection */}
      <div className="w-full">
        <h2 className="text-lg font-semibold mb-3">Difficulty</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setDifficulty("beginner")}
            className={`flex-1 py-3 rounded-lg transition font-medium ${
              difficulty === "beginner"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setDifficulty("advanced")}
            className={`flex-1 py-3 rounded-lg transition font-medium ${
              difficulty === "advanced"
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
          {[10, 20, 50].map((num) => (
            <button
              key={num}
              onClick={() => setCount(num)}
              className={`flex-1 py-3 rounded-lg transition font-medium ${
                count === num
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
