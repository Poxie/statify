import React, { CSSProperties } from "react";
import TopListTrack from './TopListTrack';
import SpotifyImage from "../spotify-image";
import { SpotifyTrack } from "@/types";

export default function TopListPopularTracks({ colors, tracks }: {
    colors: string[] | undefined;
    tracks: (SpotifyTrack & {
        color: string | undefined
    })[];
}) {
    return(
        <div className="py-8 border-t-2 border-b-2 border-t-tertiary border-b-tertiary bg-secondary">
            <ul className="w-[800px] max-w-main mx-auto grid gap-2">
                {tracks.map((track, key) => (
                    <TopListTrack 
                        track={track}
                        index={key + 1}
                        small={false}
                        key={track.id}
                    />
                ))}
            </ul>
        </div>
    )
}