import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Question } from "../models/Question";
import { Bird } from "../models/Bird";
import { MultipleChoice } from "./MultipleChoice";
import { TypeAheadDisplay } from "./TypeAheadDisplay";

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
    const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
    const [answerChecked, setAnswerChecked] = useState(false);
    const [feedbackMsg, setFeedbackMsg] = useState("");
    const [imageLoaded, setImageLoaded] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        setImageLoaded(false);
        setResult(null);
        setFeedbackMsg("");
        setAnswerChecked(false);
        // Reset audio to beginning
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.pause();
        }
        console.log("Question:", question);
        console.log("Question properties:", {
            image: question.image,
            sound: question.sound,
            answer: question.answer
        });
    }, [question]);

    function handleSelect(bird: Bird) {
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

    return (
        <div className="mb-4 flex flex-col items-center">
            {question.sound ? (
                <audio ref={audioRef} controls className="w-full max-w-md mt-4" key={question.sound}>
                    <source src={question.sound} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            ) : question.image ? (
                <>
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
                </>
            ) : null}
            <div className="mt-4 w-full relative" style={{ maxWidth: 400 }}>
                {difficulty == "beginner" && (
                    <MultipleChoice birds={birds} currentQuestion={question} onMultipleChoiceChange={onMultipleChoiceChange}>
                    </MultipleChoice>)}
                {difficulty == "advanced" && (
                    <TypeAheadDisplay key={question.answer} birds={birds} onBirdSelect={handleSelect} />
                )}
                {result === "correct" && (
                    <div className="flex items-center justify-center mt-2 text-green-600 font-semibold">
                        <span className="mr-2">✔️</span> {feedbackMsg}
                    </div>
                )}
                {result === "incorrect" && (
                    <div className="flex items-center justify-center mt-2 text-red-600 font-semibold">
                        <span className="mr-2">❌</span> {feedbackMsg}
                    </div>
                )}
            </div>
        </div>
    );
}