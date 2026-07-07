import { section as sectionClass, sectionLabel as labelClass } from "../../lib/theme";
import type { ReactNode } from "react";

interface SectionProps {
  label?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Inner section panel with optional label heading.
 * Used for quiz type, difficulty, question count, score, and answer panels.
 */
export function Section({ label, children, className = "" }: SectionProps) {
  return (
    <section className={`p-3 sm:p-[18px] ${sectionClass} ${className}`}>
      {label && <div className={labelClass}>{label}</div>}
      {children}
    </section>
  );
}
