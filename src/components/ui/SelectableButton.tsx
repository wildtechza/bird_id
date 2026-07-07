import { buttonBase, selectedGreen, unselected } from "../../lib/theme";

interface SelectableButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * A toggle button that shows the green "selected" gradient when active
 * and the neutral unselected surface otherwise.
 */
export function SelectableButton({ selected, onClick, children, className = "" }: SelectableButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${buttonBase} ${selected ? selectedGreen : unselected} ${className}`}
    >
      {children}
    </button>
  );
}
