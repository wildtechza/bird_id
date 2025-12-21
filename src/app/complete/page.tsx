"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CompleteContent() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get('score') ?? '0', 10);
  const total = parseInt(searchParams.get('total') ?? '0', 10);
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <h1 className="text-3xl font-bold">Quiz Complete!</h1>
      
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 text-center">
        <div className="text-6xl font-bold text-blue-600 mb-2">{score}/{total}</div>
        <div className="text-2xl text-gray-700">{percentage}%</div>
        <div className="text-gray-600 mt-2">Correct Answers</div>
      </div>

      <div className="flex gap-3">
        <Link
          href="/"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default function Complete() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompleteContent />
    </Suspense>
  );
}
