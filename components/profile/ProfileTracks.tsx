"use client";
import { useProfile } from "@/contexts/profile"
import Track from "../track";
import ProfileIndexLabel from "./ProfileIndexLabel";
import { useState } from "react";
import ProfileSectionFooter from "./ProfileSectionFooter";
import ProfileTrackSkeleton from "../skeleton/profile-track";

const DEFAULT_VISIBLE_TRACKS = 7;
export default function ProfileTracks() {
    const { loading, tracks } = useProfile();
    
    const [showAll, setShowAll] = useState(false);

    const visibleTracks = tracks.slice(0, showAll ? tracks.length : DEFAULT_VISIBLE_TRACKS);
    return(
        <section>
            <h2 className="mb-3 text-2xl md:text-3xl font-medium">
                Your most played songs
            </h2>
            <ul className="p-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 bg-secondary border-[1px] border-tertiary rounded-lg">
                {loading && (
                    Array.from(Array(DEFAULT_VISIBLE_TRACKS)).map((_, key) => (
                        <ProfileTrackSkeleton key={key} />
                    ))
                )}
                {visibleTracks.map((track, index) => (
                    <li
                        className="relative" 
                        key={track.id}
                    >
                        <ProfileIndexLabel 
                            index={index + 1}
                        />
                        <Track 
                            track={track}
                            className="flex-col gap-1"
                            imageClassName="w-full border-2 border-tertiary"
                            imageContainerClassName="w-full"
                        />
                    </li>
                ))}
            </ul>
            <ProfileSectionFooter 
                showAll={showAll}
                setShowAll={setShowAll} 
            />
        </section>
    )
}