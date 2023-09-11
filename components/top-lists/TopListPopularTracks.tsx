import React, { CSSProperties } from "react";
import TopListTrack from './TopListTrack';
import { ToplistInfo } from "@/hooks/useCountryTopList";

const PLACEHOLDER_COUNT = 5;
export default function TopListPopularTracks({ tracks, loading }: {
    tracks: ToplistInfo['tracks'] | undefined;
    loading: boolean;
}) {
    return(
        <div className="[--border-right:0] [--border-left:0] gradient-border bg-secondary">
            <ul className="py-8 w-main max-w-main mx-auto grid md:grid-cols-2 gap-2">
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
                        className="h-[122px]"
                        key={key}
                    />
                ))}
            </ul>
        </div>
    )
}