"use client";
import Track from "../track";
import ProfileIndexLabel from "./ProfileIndexLabel";
import React, { useState } from "react";
import ProfileSectionFooter from "./ProfileSectionFooter";
import ProfileTrackSkeleton from "../skeleton/profile-track";
import ProfileTopSection from "./ProfileTopSection";
import ProfileTopItem from "./ProfileTopItem";
import ProfileTopItemSkeleton from "../skeleton/profile-top-item";
import useProfileTracks from "@/hooks/useProfileTracks";
import ProfileSectionHeader from "./ProfileSectionHeader";

const TOP_TRACKS = 3;
const DEFAULT_VISIBLE_TRACKS = 7;
export default function ProfileTracks() {
    const { loading, tracks, timeRange, setTimeRange } = useProfileTracks({ timeRange: 'medium_term' });
    
    const [showAll, setShowAll] = useState(false);

    const topTracks = [
        { track: tracks[1], index: 2 },
        { track: tracks[0], index: 1 },
        { track: tracks[2], index: 3 },
    ]
    const othersTracks = tracks.slice(TOP_TRACKS, showAll ? tracks.length : DEFAULT_VISIBLE_TRACKS + TOP_TRACKS);
    return(
        <section>
            <ProfileSectionHeader 
                header="Your most played songs"
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                className="mb-3"
            />
            <div className="border-[1px] border-tertiary rounded-md">
                <ProfileTopSection>
                    {topTracks.map(item => (
                        <ProfileTopItem 
                            index={item.index}
                            key={item.index}
                        >
                            {item.track ? (
                                <Track 
                                    track={item.track}
                                    trackNameClassName="text-lg md:text-xl"
                                    imageClassName="w-24"
                                />
                            ) : (
                                <ProfileTopItemSkeleton />
                            )}
                        </ProfileTopItem>
                    ))}
                </ProfileTopSection>
                <ul className="p-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 bg-secondary border-[1px] border-tertiary rounded-lg">
                    {loading && (
                        Array.from(Array(DEFAULT_VISIBLE_TRACKS)).map((_, key) => (
                            <ProfileTrackSkeleton key={key} />
                        ))
                    )}
                    {othersTracks.map((track, index) => (
                        <li
                            className="relative" 
                            key={track.id}
                        >
                            <ProfileIndexLabel 
                                index={index + 1 + TOP_TRACKS}
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
            </div>
            <ProfileSectionFooter 
                showAll={showAll}
                setShowAll={setShowAll} 
            />
        </section>
    )
}