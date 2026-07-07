import { card as cardClass } from "../../lib/theme";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * The translucent content card used on every route.
 * Wraps the shared light/dark surface styling.
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <main className={`${cardClass} ${className}`}>
      {children}
    </main>
  );
}
