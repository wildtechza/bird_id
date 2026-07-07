/**
 * Shared class-name tokens used across the app.
 *
 * Centralising these keeps the light/dark theme variants in one place
 * so a colour change doesn't require hunting through every component.
 */

/** The translucent content card used on every route. */
export const card = [
  "w-full max-w-[860px] rounded-[24px] sm:rounded-[28px] backdrop-blur-xl",
  "bg-white border border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.12)]",
  "dark:bg-[rgba(20,31,28,0.82)] dark:border-white/12 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_60px_rgba(0,0,0,0.35)]",
].join(" ");

/** Inner section panel (quiz type, difficulty, questions, score, answer). */
export const section = [
  "rounded-[18px] sm:rounded-[22px]",
  "bg-black/[0.04] dark:bg-white/[0.035]",
  "shadow-[inset_0_1px_0_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
].join(" ");

/** Section label text. */
export const sectionLabel =
  "mb-2 sm:mb-[14px] text-black/72 dark:text-white/72 text-xs sm:text-sm font-bold uppercase tracking-[0.08em]";

/** Green accent — used for headings, score numbers, and selected summary. */
export const accentGreen = "text-[#5b8a2e] dark:text-[#79b84c]";

/** Lighter green — used for feedback / answer text. */
export const accentLightGreen = "text-[#5b8a2e] dark:text-[#a8e96f]";

/** Selected (green) button gradient — single layer for Tailwind v4 compatibility. */
export const selectedGreen = [
  "bg-[linear-gradient(180deg,rgba(121,184,76,0.28),rgba(121,184,76,0.10))]",
  "outline outline-2 outline-[rgba(121,184,76,0.8)]",
  "dark:bg-[linear-gradient(180deg,rgba(121,184,76,0.24),rgba(121,184,76,0.08))]",
  "dark:outline-[rgba(151,216,91,0.7)]",
].join(" ");

/** Selected (purple) button gradient — single layer for Tailwind v4 compatibility. */
export const selectedPurple = [
  "bg-[linear-gradient(180deg,rgba(154,82,255,0.22),rgba(154,82,255,0.06))]",
  "outline outline-2 outline-[rgba(124,58,237,0.6)] text-[#7c3aed]",
  "dark:bg-[linear-gradient(180deg,rgba(154,82,255,0.28),rgba(154,82,255,0.08))]",
  "dark:outline-[rgba(160,97,255,0.8)] dark:text-[#d8c1ff]",
].join(" ");

/** Unselected button surface. */
export const unselected = [
  "bg-black/[0.05] hover:-translate-y-0.5 hover:bg-black/[0.08]",
  "dark:bg-white/[0.055] dark:hover:bg-white/[0.09]",
].join(" ");

/** Shared button transition + inset shadow. */
export const buttonBase =
  "transition duration-200 shadow-[inset_0_1px_0_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";

/** Primary green CTA (Start Quiz, Next, Home). */
export const primaryButton = [
  "bg-[linear-gradient(135deg,#76aa48,#4f872f)] text-white font-extrabold",
  "flex items-center justify-center gap-4",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_16px_36px_rgba(76,128,47,0.35)]",
  "transition duration-200 hover:-translate-y-0.5 hover:brightness-105",
].join(" ");

/** Secondary / ghost button (View Answer). */
export const ghostButton = [
  "bg-red-500/15 text-[#171717] dark:bg-red-500/20 dark:text-white font-bold",
  "shadow-[inset_0_1px_0_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
  "transition duration-200 hover:-translate-y-0.5 hover:bg-red-500/25 dark:hover:bg-red-500/30",
].join(" ");
