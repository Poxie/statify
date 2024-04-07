"use client";
import ProfileArtist from "./ProfileArtist";
import { useState } from "react";
import ProfileSectionFooter from "./ProfileSectionFooter";
import ProfileArtistSkeleton from "../skeleton/profile-artist";
import ProfileTopSection from "./ProfileTopSection";
import ProfileTopItem from "./ProfileTopItem";
import ProfileTopItemSkeleton from "../skeleton/profile-top-item";
import ProfileTopArtist from "./ProfileTopArtist";
import useProfileArtists from "@/hooks/useProfileArtists";

const DEFAULT_VISIBLE_ARTISTS = 7;
export default function ProfileArtists() {
    const { loading, artists } = useProfileArtists({ timeRange: 'medium_term' });

    const [showAll, setShowAll] = useState(false);

    const topArtists = [
        { artist: artists[1], index: 2 },
        { artist: artists[0], index: 1 },
        { artist: artists[2], index: 3 },
    ]
    const otherArtists = artists.slice(3, showAll ? artists.length : 3 + DEFAULT_VISIBLE_ARTISTS);
    return(
        <section>
            <h2 className="mb-3 text-2xl md:text-3xl font-medium">
                Your most liked artists
            </h2>
            <div className="border-[1px] border-tertiary rounded-md overflow-hidden">
                <ProfileTopSection>
                    {topArtists.map(item => (
                        <ProfileTopItem 
                            index={item.index}
                            key={item.index}
                        >
                            {item.artist ? (
                                <ProfileTopArtist 
                                    artist={item.artist}
                                />
                            ) : (
                                <ProfileTopItemSkeleton />
                            )}
                        </ProfileTopItem>
                    ))}
                </ProfileTopSection>
                <ul className="p-7 grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 bg-secondary">
                    {loading && (
                        Array.from(Array(DEFAULT_VISIBLE_ARTISTS)).map((_, key) => (
                            <ProfileArtistSkeleton key={key} />
                        ))
                    )}
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
            <ProfileSectionFooter 
                showAll={showAll}
                setShowAll={setShowAll} 
            />
        </section>
    )
}