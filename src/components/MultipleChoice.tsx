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

        while (temp.length < 5) {
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
        <div className="space-y-3">
            {options.map((bird) => (
                <label
                    key={bird.sabap2}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedBird?.sabap2 === bird.sabap2
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
                    }`}
                >
                    <input
                        type="radio"
                        name={groupName}
                        value={bird.sabap2}
                        checked={selectedBird?.sabap2 == bird.sabap2}
                        onChange={() => onChange(bird)}
                        className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                    />
                    <span className="ml-3 text-gray-800 font-medium">{bird.fullName}</span>
                </label>
            ))}
        </div>
    );
};
