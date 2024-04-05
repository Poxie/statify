"use client";
import { useProfile } from "@/contexts/profile"
import ProfileTopArtist from "./ProfileTopArtists";
import ProfileArtist from "./ProfileArtist";
import { useState } from "react";

export default function ProfileArtists() {
    const { loading, artists } = useProfile();

    const [showAll, setShowAll] = useState(false);

    if(loading) return null;

    const topArtists = artists.slice(0,3);
    const otherArtists = artists.slice(3, showAll ? artists.length : 3 + 7);
    return(
        <>
        <h2 className="mb-3 text-2xl md:text-3xl font-medium">
            Your most liked artists
        </h2>
        <div className="border-[1px] border-tertiary rounded-md overflow-hidden">
            <div className="p-7 grid md:grid-cols-3 items-end gap-7 md:gap-3 bg-dotted bg-[length:31px_31px] bg-center">
                <ProfileTopArtist 
                    artist={topArtists[1]}
                    artistNumber={2}
                />
                <ProfileTopArtist 
                    artist={topArtists[0]}
                    artistNumber={1}
                />
                <ProfileTopArtist 
                    artist={topArtists[2]}
                    artistNumber={3} 
                />
            </div>
            <ul className="p-7 grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 bg-secondary">
                {otherArtists.map((artist, index) => (
                    <li key={artist.id}>
                        <ProfileArtist 
                            artist={artist}
                            index={topArtists.length + index + 1}
                        />
                    </li>
                ))}
            </ul>
        </div>
        <div className="p-4 z-20 sticky bottom-0 bg-primary">
            <button 
                className="ml-auto block text-sm text-secondary hover:text-primary transition-colors"
                onClick={() => setShowAll(!showAll)}
            >
                {showAll ? 'Show less' : 'Show all'}
            </button>
        </div>
        </>
    )
}