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
                className="w-full px-3 py-2 border rounded"
            />
            {suggestions.length > 0 && (
                <ul
                    ref={suggestionsRef}
                    className="w-full absolute left-0 border rounded shadow z-10 mt-1 max-h-40 overflow-y-auto 
                    bg-white dark:bg-gray-800"
                >
                    {suggestions.map(bird => (
                        <li
                            key={bird.fullName}
                            className="px-3 py-2 cursor-pointer hover:bg-blue-100"
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
