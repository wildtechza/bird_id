import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { Question } from "../models/Question";
import { Bird } from "../models/Bird";
import { MultipleChoice } from "./MultipleChoice";

const CORRECT_MESSAGES = [
    "Eggcellent! 🥚",
    "Tweet-tastic! 🐦",
    "Flaptastic! 🪽",
    "Peck-perfection! 🍽️",
    "Owl you need is this correct! 🦉",
    "Flock yeah! 🐥",
    "Beak-ause you’re right! 🐤",
    "Wing it to win it! 🪽",
    "Perch-fect! 🪶",
];

const INCORRECT_MESSAGES = [
    "Fowl play! 🐓",
    "Not your peck! 🐦",
    "Eggstra wrong! 🥚",
    "Feather not! 🪶",
    "Bird-ened with mistakes! 🐥",
    "Owl be honest… wrong. 🦉",
    "Cluck up! 🐔",
    "You’ve flown off track! 🕊️",
    "Nest so good… try again! 🪹",
];

export interface QuestionDisplayProps {
    question: Question;
    birds: Bird[];
    difficulty: string;
    onAnswerChecked?: (isCorrect: boolean) => void;
}

export function QuestionDisplay({ question, birds, difficulty, onAnswerChecked }: QuestionDisplayProps) {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState<Bird[]>([]);
    const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
    const [answerChecked, setAnswerChecked] = useState(false);
    const [feedbackMsg, setFeedbackMsg] = useState("");
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        setImageLoaded(false);
        setInput("");
        setSuggestions([]);
        setResult(null);
        setFeedbackMsg("");
        setAnswerChecked(false);
    }, [question]);

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
        setResult(null);
        setFeedbackMsg("");
    }

    function handleSelect(bird: Bird) {
        setInput(bird.fullName);
        setSuggestions([]);
        const isCorrect = String(bird.sabap2) === String(question.answer);
        if (isCorrect) {
            setResult("correct");
            const msg = CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)];
            setFeedbackMsg(msg);
        } else {
            setResult("incorrect");
            const msg = INCORRECT_MESSAGES[Math.floor(Math.random() * INCORRECT_MESSAGES.length)];
            setFeedbackMsg(msg);
        }
        if (!answerChecked && onAnswerChecked) {
            onAnswerChecked(isCorrect);
            setAnswerChecked(true);
        }
    }

    function onMultipleChoiceChange(value: string | number) {
        const selectedBird = birds.find(bird => String(bird.sabap2) === String(value));
        if (selectedBird) {
            handleSelect(selectedBird);
        }
    }

    const suggestionsRef = useRef<HTMLUListElement>(null);

    function handleFocus() {
        setTimeout(() => {
            console.log("Scrolling to suggestions");
            suggestionsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
    };

    return (
        <div className="mb-4 flex flex-col items-center">
            {!imageLoaded && (
                <Image
                    src="/loading.svg"
                    alt="Loading..."
                    width={400}
                    height={300}
                    style={{ height: "auto", width: "100%", maxWidth: "400px" }}
                    className="animate-pulse"
                />
            )}
            <img
                src={question.image}
                alt={`Question`}
                width={400}
                height={300}
                style={{
                    height: "auto",
                    width: "100%",
                    maxWidth: "400px",
                    display: imageLoaded ? "block" : "none",
                }}
                onLoad={() => setImageLoaded(true)}
            />
            <div className="mt-4 w-full relative" style={{ maxWidth: 400 }}>
                {difficulty == "beginner" && (
                    <MultipleChoice birds={birds} currentQuestion={question} onMultipleChoiceChange={onMultipleChoiceChange}>
                    </MultipleChoice>)}
                {difficulty == "advanced" && (
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
                )}
                {result === "correct" && (
                    <div className="flex flex-col items-center mt-2 text-green-600 font-semibold">
                        <span className="mr-2">✔️</span> {feedbackMsg}
                    </div>
                )}
                {result === "incorrect" && (
                    <div className="flex flex-col items-center mt-2 text-red-600 font-semibold">
                        <span className="mr-2">❌</span> {feedbackMsg}
                    </div>
                )}
            </div>
        </div>
    );
}