"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Question } from "../models/Question";
import { Bird } from "../models/Bird";

// Define the shape of the context
interface CentralDataContextType {
    questions: Question[] | null;
    birds: Bird[] | null;
}

const CentralDataContext = createContext<CentralDataContextType | undefined>(undefined);

export function CentralDataProvider({ children }: { children: React.ReactNode }) {
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [birds, setBirds] = useState<Bird[] | null>(null);

    const fetchData = async () => {
        const birdsRes = await fetch("/birds/rsa/data/birds.json");

        const birdsData: { data: Bird[] } = await birdsRes.json();

        // Generate questions from birds that have images
        const questionsFromBirds: Question[] = birdsData.data
            .filter((bird: any) => bird.image && bird.image !== null)
            .map((bird: any) => ({
                image: bird.image,
                answer: bird.sabap2.toString()
            }));

        setQuestions(questionsFromBirds || []);
        setBirds(birdsData.data || []);

        console.log(`Fetched questions and birds data ${questionsFromBirds.length} ${birdsData.data.length}`);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <CentralDataContext.Provider value={{ questions, birds }}>
            {children}
        </CentralDataContext.Provider>
    );
}

export function useCentralData(): CentralDataContextType {
  const context = useContext(CentralDataContext);
  if (!context) {
    throw new Error("useCentralData must be used within a CentralDataProvider");
  }
  return context;
}