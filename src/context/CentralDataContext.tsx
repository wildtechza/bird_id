"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Question } from "../models/Question";
import { Bird } from "../models/Bird";

// Define the shape of the context
interface CentralDataContextType {
    birdImages: Question[] | null;
    birdSounds: Question[] | null;
    birds: Bird[] | null;
    loading: boolean;
    error: Error | null;
    /** Re-run the data fetch (e.g. after a network failure). */
    refresh: () => void;
}

const CentralDataContext = createContext<CentralDataContextType | undefined>(undefined);

export function CentralDataProvider({ children }: { children: React.ReactNode }) {
    const [birdImages, setBirdImages] = useState<Question[] | null>(null);
    const [birdSounds, setBirdSounds] = useState<Question[] | null>(null);
    const [birds, setBirds] = useState<Bird[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const birdsRes = await fetch("/birds/rsa/data/birds.json");
            if (!birdsRes.ok) throw new Error(`Failed to load bird data (${birdsRes.status})`);

            const birdsData: { data: Bird[] } = await birdsRes.json();

            // Generate questions from birds that have images
            const birdImagesData: Question[] = birdsData.data
                .filter((bird: Bird): bird is Bird & { image: string } => Boolean(bird.image))
                .map((bird) => ({
                    image: bird.image,
                    answer: bird.sabap2.toString()
                }));

            // Generate questions from birds that have sounds
            const birdSoundsData: Question[] = birdsData.data
                .filter((bird: Bird): bird is Bird & { sound: string } => Boolean(bird.sound))
                .map((bird) => ({
                    sound: bird.sound,
                    answer: bird.sabap2.toString()
                }));

            setBirdImages(birdImagesData);
            setBirdSounds(birdSoundsData);
            setBirds(birdsData.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Unknown error loading bird data"));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <CentralDataContext.Provider value={{ birdImages, birdSounds, birds, loading, error, refresh: fetchData }}>
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
