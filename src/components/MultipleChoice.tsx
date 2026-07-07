import React, { useEffect, useState, useId } from "react";

import { Bird } from "../models/Bird";
import { Question } from "../models/Question";

interface MultipleChoiceProps {
    birds: Bird[];
    currentQuestion: Question;
    onMultipleChoiceChange: (value: string | number) => void;
}

export function MultipleChoice({ birds, currentQuestion, onMultipleChoiceChange }: MultipleChoiceProps) {
    const groupName = useId();
    const [options, setOptions] = useState<Bird[]>([]);
    const [selectedBird, setSelectedBird] = useState<Bird | null>(null);

    useEffect(() => {
        setSelectedBird(null);

        const temp: Bird[] = [];

        const correctBird = birds.find(b => String(b.sabap2) === String(currentQuestion.answer));
        if (correctBird) {
            temp.push(correctBird);
        }

        while (temp.length < 4) {
            const idx = Math.floor(Math.random() * birds.length);
            const picked = birds[idx];
            if (!temp.find(b => b.sabap2 === picked.sabap2)) {
                temp.push(picked);
            }
        }

        temp.sort(() => Math.random() - 0.5);

        setOptions(temp);
    }, [birds, currentQuestion]);


    function onChange(bird: Bird) {
        setSelectedBird(bird);
        onMultipleChoiceChange(bird.sabap2);
    }

    return (
        <div className="space-y-1.5">
            {options.map((bird) => (
                <label
                    key={bird.sabap2}
                    className={`flex items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-[14px] cursor-pointer transition-all duration-200 shadow-[inset_0_1px_0_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${
                        selectedBird?.sabap2 === bird.sabap2
                            ? 'bg-[linear-gradient(180deg,rgba(121,184,76,0.28),rgba(121,184,76,0.10)),rgba(0,0,0,0.03)] outline outline-2 outline-[rgba(121,184,76,0.8)] dark:bg-[linear-gradient(180deg,rgba(121,184,76,0.24),rgba(121,184,76,0.08)),rgba(255,255,255,0.06)] dark:outline-[rgba(151,216,91,0.7)]'
                            : 'bg-black/[0.05] hover:-translate-y-0.5 hover:bg-black/[0.08] dark:bg-white/[0.055] dark:hover:bg-white/[0.09]'
                    }`}
                >
                    <input
                        type="radio"
                        name={groupName}
                        value={bird.sabap2}
                        checked={selectedBird?.sabap2 == bird.sabap2}
                        onChange={() => onChange(bird)}
                        className="hidden"
                    />
                    <span className="ml-3 text-[#171717] dark:text-white text-sm sm:text-base font-medium">{bird.fullName}</span>
                </label>
            ))}
        </div>
    );
};
