import React, { CSSProperties } from "react";
import TopListTrack from './TopListTrack';
import { ToplistInfo } from "@/hooks/useCountryTopList";

const PLACEHOLDER_COUNT = 5;
export default function TopListPopularTracks({ tracks, loading }: {
    tracks: ToplistInfo['tracks'] | undefined;
    loading: boolean;
}) {
    return(
        <div className="py-8 border-t-2 border-b-2 border-t-tertiary border-b-tertiary bg-secondary">
            <ul className="w-main max-w-main mx-auto grid md:grid-cols-2 gap-2">
                {tracks?.map((track, key) => (
                    <TopListTrack 
                        loading={loading}
                        track={track}
                        index={key + 1}
                        small={false}
                        key={track.id}
                    />
                ))}
                {!tracks && Array.from(Array(PLACEHOLDER_COUNT)).map((_,key) => (
                    <div 
                        className="h-[120px]"
                        key={key}
                    />
                ))}
            </ul>
        </div>
    )
}