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
    <div className="min-h-[100dvh] flex items-start justify-center p-4 sm:p-6">
      <main className="w-full max-w-[860px] p-5 sm:p-7 rounded-[24px] sm:rounded-[28px] bg-white border border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.12)] dark:bg-[rgba(20,31,28,0.82)] dark:border-white/12 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl flex flex-col items-center gap-5 sm:gap-6">
        <h1 className="m-0 text-center text-[#5b8a2e] dark:text-[#79b84c] text-2xl sm:text-[30px] font-extrabold">
          Quiz Complete!
        </h1>

        <div className="w-full p-4 sm:p-[18px] rounded-[22px] bg-black/[0.04] dark:bg-white/[0.035] shadow-[inset_0_1px_0_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] text-center">
          <div className="text-5xl sm:text-6xl font-extrabold text-[#5b8a2e] dark:text-[#a8e96f] mb-2">{score}/{total}</div>
          <div className="text-2xl text-black/80 dark:text-white/80">{percentage}%</div>
          <div className="text-black/60 dark:text-white/60 mt-2">Correct Answers</div>
        </div>

        <div className="w-full flex gap-3 sm:gap-[14px]">
          <Link
            href="/"
            className="flex-1 h-14 sm:h-[60px] grid place-items-center rounded-[18px] bg-[linear-gradient(135deg,#76aa48,#4f872f)] text-white text-lg font-extrabold shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_16px_36px_rgba(76,128,47,0.35)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105"
          >
            Home
          </Link>
        </div>
      </main>
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
