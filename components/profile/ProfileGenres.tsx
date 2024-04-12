"use client";
import { useState } from "react";
import ProfileSectionFooter from "./ProfileSectionFooter";
import ProfileGenreSkeleton from "../skeleton/profile-genre";
import useProfileGenres from "@/hooks/useProfileGenres";
import ProfileSectionHeader from "./ProfileSectionHeader";
import { useModal } from "@/contexts/modal";
import GenreModal from "@/modals/genre";

const DEFAULT_VISIBLE_GENRES = 5;
const MAX_VISIBLE_GENRES = 15;
export default function ProfileGenres() {
    const { openModal } = useModal();

    const { genresByCount, loading, timeRange, setTimeRange } = useProfileGenres({ timeRange: 'medium_term' });

    const [showAll, setShowAll] = useState(false);

    const openGenreModal = (genre: string) => {
        openModal(
            <GenreModal 
                genre={genre}
                timeRange={timeRange}
            />
        );
    }

    const genres = Object.entries(genresByCount).sort((a, b) => b[1] - a[1]);

    const visibleGenres = genres.slice(0, showAll ? MAX_VISIBLE_GENRES : DEFAULT_VISIBLE_GENRES);
    return(
        <section>
            <ProfileSectionHeader 
                header="Your most listened genres"
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                tooltip="Top genres are based on the genres of your top artists. 10 occurrences means 10 of your top 50 artists exhibit traits of that genre."
                className="mb-3"
            />
            <ul className="p-4 bg-secondary border-[1px] border-tertiary rounded-md">
                {loading && (
                    Array.from(Array(DEFAULT_VISIBLE_GENRES)).map((_, key) => (
                        <ProfileGenreSkeleton
                            className="mb-4 last:mb-0"
                            key={key} 
                        />
                    ))
                )}
                {visibleGenres.map(([genre, count]) => {
                    const maxCount = genres[0][1];
                    return(
                        <li 
                            key={genre}
                            className="-mx-2 first:-mt-2 last:-mb-2"
                        >
                            <button 
                                className="p-2 w-full hover:bg-tertiary transition-colors rounded-md"
                                onClick={() => openGenreModal(genre)}
                            >
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
                            </button>
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