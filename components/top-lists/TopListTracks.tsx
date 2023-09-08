import React from 'react';
import { SpotifyTrack } from "@/types";
import SpotifyImage from "../spotify-image";
import Link from 'next/link';
import TopListTrack from './TopListTrack';

export default function TopListTracks({ tracks }: {
    tracks: SpotifyTrack[];
}) {
    return(
        <div className="py-8 border-t-2 border-b-2 border-t-tertiary border-b-tertiary bg-secondary">
            <div className="w-main max-w-main mx-auto grid grid-cols-5 gap-3">
                {tracks.map((track, key) => (
                    <TopListTrack 
                        track={track}
                        index={key + 1}
                        key={track.id}
                    />
                ))}
            </div>
        </div>
    )
}