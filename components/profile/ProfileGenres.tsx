"use client";
import { QuestionIcon } from "@/assets/icons/QuestionIcon";
import { useProfile } from "@/contexts/profile"
import { HasTooltip } from "@/contexts/tooltip/HasTooltip";
import { useState } from "react";

const DEFAULT_VISIBLE_GENRES = 5;
const MAX_VISIBLE_GENRES = 15;
export default function ProfileGenres() {
    const { genres, loading } = useProfile();

    const [showAll, setShowAll] = useState(false);

    if(loading) return null;

    const genresByCount = Object.entries(genres).sort((a, b) => b[1] - a[1]);
    const maxCount = genresByCount[0][1];

    const visibleGenres = genresByCount.slice(0, showAll ? MAX_VISIBLE_GENRES : DEFAULT_VISIBLE_GENRES);
    return(
        <section>
            <h2 className="mb-3 flex items-center gap-3 text-2xl md:text-3xl font-medium">
                Your most listened genres
                <HasTooltip 
                    delay={250}
                    tooltip="Top genres are based on the genres of your top artists. 10 occurrences means 10 of your top 50 artists exhibit traits of that genre."
                >
                    <QuestionIcon className="mt-1.5 w-4 text-secondary" />
                </HasTooltip>
            </h2>
            <ul className="p-4 grid gap-2 bg-secondary border-[1px] border-tertiary rounded-md">
                {visibleGenres.map(([genre, count]) => (
                    <li key={genre}>
                        <span className="mb-2 flex items-center gap-1.5">
                            {genre}
                            <span className="mt-1 text-xs text-secondary">
                                ({count} occurrences)
                            </span>
                        </span>
                        <div 
                            className="h-6 bg-c-primary rounded-lg"
                            style={{ width: `${(count / maxCount) * 100}%` }}
                        />
                    </li>
                ))}
                </ul>
            <div className="p-4 z-20 sticky bottom-0 bg-primary">
                <button 
                    className="ml-auto block text-sm text-secondary hover:text-primary transition-colors"
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? 'Show less' : 'Show all'}
                </button>
            </div>
        </section>
    )
}