import React from 'react';
import Link from "next/link";
import SpotifyTrackImage from "../SpotifyTrackImage";
import { SpotifyTrack } from "@/types";
import SpotifyTrackName from '../spotify-track-name';

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
                className="w-14 aspect-square rounded-md"
                src={track.album.images.at(-1)?.url} 
                track={track}
                height={100}
                width={100}
            />
            <div className="flex flex-col overflow-hidden">
                <SpotifyTrackName 
                    track={track}
                    className="text-sm font-semibold text-ellipsis whitespace-nowrap overflow-hidden"
                />
                <span className="text-xs text-secondary">
                    by {track.artists.map((artist, key) => (
                        <React.Fragment key={artist.id}>
                            <Link
                                className="transition-colors hover:text-primary"
                                href={`/?a=${artist.id}`}
                                scroll={false}
                            >
                                {artist.name}
                            </Link>
                            {key !== track.artists.length - 1 && ', '}
                        </React.Fragment>
                    ))}
                </span>
            </div>
        </div>
    )
}