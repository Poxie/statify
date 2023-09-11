import React from 'react';
import Link from "next/link";
import SpotifyTrackImage from "../spotify-track-image";
import { SpotifyTrack } from "@/types";
import SpotifyTrackName from '../spotify-track-name';
import SpotifyTrackArtists from '../spotify-track-artists';

export default function Track({ track }: {
    track: SpotifyTrack | undefined;
}) {
    if(!track) return(
        <div className="w-14 aspect-square">

        </div>
    )

    return(
        <div className="group flex items-start gap-3">
            <SpotifyTrackImage
                imageClassName="min-w-[3.5rem] w-14 aspect-square rounded-md"
                src={track.album.images.at(-1)?.url} 
                track={track}
                height={100}
                width={100}
            />
            <div className="flex flex-col overflow-hidden">
                <SpotifyTrackName 
                    track={track}
                    className="text-sm"
                />
                <SpotifyTrackArtists artists={track.artists}/>
            </div>
        </div>
    )
}