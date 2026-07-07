import { useRef, useState } from "react";
import { Bird } from "../models/Bird";

export interface TypeAheadDisplayProps {
    birds: Bird[];
    onBirdSelect: (bird: Bird) => void;
}

export function TypeAheadDisplay({ birds, onBirdSelect }: TypeAheadDisplayProps) {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState<Bird[]>([]);
    const suggestionsRef = useRef<HTMLUListElement>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setInput(value);
        if (value.length === 0) {
            setSuggestions([]);
        } else {
            setSuggestions(
                birds.filter(bird => {
                    const name = bird.fullName.toLowerCase();
                    const words = value.toLowerCase().trim().split(/\s+/);
                    return words.every(word => name.includes(word));
                })
            );
            handleFocus();
        }
    }

    function handleSelect(bird: Bird) {
        setInput(bird.fullName);
        setSuggestions([]);
        onBirdSelect(bird);
    }

    function handleFocus() {
        setTimeout(() => {
            console.log("Scrolling to suggestions");
            suggestionsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
    }

    return (
        <>
            <input
                type="text"
                value={input}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Type bird name..."
                className="w-full px-4 py-3 rounded-[16px] bg-white/[0.055] text-white placeholder-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none focus:outline-2 focus:outline-[rgba(151,216,91,0.7)]"
            />
            {suggestions.length > 0 && (
                <ul
                    ref={suggestionsRef}
                    className="w-full absolute left-0 rounded-[16px] shadow-[0_16px_36px_rgba(0,0,0,0.35)] z-10 mt-1 max-h-40 overflow-y-auto bg-[rgba(20,31,28,0.95)] border border-white/12 backdrop-blur-xl"
                >
                    {suggestions.map(bird => (
                        <li
                            key={bird.fullName}
                            className="px-4 py-3 cursor-pointer text-white hover:bg-white/[0.09] first:rounded-t-[16px] last:rounded-b-[16px]"
                            onClick={() => handleSelect(bird)}
                        >
                            {bird.fullName}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
