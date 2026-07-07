import { Question } from "../models/Question";

/**
 * Pick `count` unique questions at random from `source`.
 *
 * Falls back to the full source length when `count` exceeds availability,
 * so the caller can pass "All" as the source length without extra branching.
 */
export function pickRandomQuestions(source: Question[], count: number): Question[] {
    if (source.length === 0 || count <= 0) return [];

    const target = Math.min(count, source.length);
    const pool = [...source];
    const picked: Question[] = [];

    while (picked.length < target) {
        const idx = Math.floor(Math.random() * pool.length);
        picked.push(pool.splice(idx, 1)[0]);
    }

    return picked;
}

/**
 * Resolve the raw `count` query param (number or "All") to a concrete number
 * bounded by the available question source length.
 */
export function resolveCount(countParam: string, available: number): number {
    if (countParam === "All") return available;
    const parsed = parseInt(countParam, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
}
