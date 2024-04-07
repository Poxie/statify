"use client";
import { QuestionIcon } from "@/assets/icons/QuestionIcon";
import { HasTooltip } from "@/contexts/tooltip/HasTooltip";
import { useState } from "react";
import ProfileSectionFooter from "./ProfileSectionFooter";
import ProfileGenreSkeleton from "../skeleton/profile-genre";
import useProfileGenres from "@/hooks/useProfileGenres";

const DEFAULT_VISIBLE_GENRES = 5;
const MAX_VISIBLE_GENRES = 15;
export default function ProfileGenres() {
    const { genresByCount, loading } = useProfileGenres({ timeRange: 'medium_term' });

    const [showAll, setShowAll] = useState(false);

    const genres = Object.entries(genresByCount).sort((a, b) => b[1] - a[1]);
    
    const visibleGenres = genres.slice(0, showAll ? MAX_VISIBLE_GENRES : DEFAULT_VISIBLE_GENRES);
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
                {loading && (
                    Array.from(Array(DEFAULT_VISIBLE_GENRES)).map((_, key) => (
                        <ProfileGenreSkeleton key={key} />
                    ))
                )}
                {visibleGenres.map(([genre, count]) => {
                    const maxCount = genres[0][1];
                    return(
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
                    )
                })}
            </ul>
            <ProfileSectionFooter 
                showAll={showAll}
                setShowAll={setShowAll} 
            />
        </section>
    )
}