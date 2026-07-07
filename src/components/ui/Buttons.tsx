import { primaryButton, ghostButton } from "../../lib/theme";

interface PrimaryButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

/** Green gradient call-to-action button (Start Quiz, Next, Home). */
export function PrimaryButton({ onClick, children, className = "" }: PrimaryButtonProps) {
  return (
    <button onClick={onClick} className={`${primaryButton} ${className}`}>
      {children}
    </button>
  );
}

interface GhostButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

/** Neutral secondary button (View Answer). */
export function GhostButton({ onClick, children, className = "" }: GhostButtonProps) {
  return (
    <button onClick={onClick} className={`${ghostButton} ${className}`}>
      {children}
    </button>
  );
}
