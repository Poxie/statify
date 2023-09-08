import React from 'react';
import SpotifyImage from "../spotify-image";
import { SpotifyTrack } from "@/types";
import Link from 'next/link';

export default function TopListTrack({ track, index }: {
    track: SpotifyTrack;
    index: number;
}) {
    const bgImage = track.album.images.at(-1)?.url;
    const image = track.album.images.at(0)?.url;
    return(
        <div className="relative grid gap-2 p-3 border-[1px] border-tertiary rounded-lg">
            <span className="absolute top-5 right-6 text-4xl font-extrabold drop-shadow-[0_0px_2px_rgba(0,0,0,0.8)]">
                {index}
            </span>
            <SpotifyImage 
                src={bgImage}
                height={64}
                width={64}
                className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
            />
            <SpotifyImage 
                src={image}
                height={200}
                width={200}
                className="aspect-video"
            />
            <div className="flex">
                <div className="grid">
                    <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        {track.name}
                    </span>
                    <span className="text-xs text-secondary">
                        by{' '}
                        {track.artists.map((artist, key) => (
                            <React.Fragment key={artist.id}>
                                <Link
                                    href={`/?a=${artist.id}`}
                                    className="transition-colors hover:text-primary"
                                >
                                    {artist.name}
                                </Link>
                                {key !== track.artists.length - 1 && (
                                    ', '
                                )}
                            </React.Fragment>
                        ))}
                    </span>
                </div>
            </div>
        </div>
    )
}