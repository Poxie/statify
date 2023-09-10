"use client";
import React, { CSSProperties } from 'react';
import SpotifyImage from "../spotify-image";
import { SpotifyPlaylist } from "@/types";
import Link from 'next/link';
import TopListTrackPreview from './TopListTrackPreview';

export default function TopListTrack({ track, index }: {
    track: SpotifyPlaylist['tracks']['items'][number]['track'];
    index: number;
}) {
    const bgImage = track.album.images.at(-1)?.url;
    const image = track.album.images.at(0)?.url;

    return(
        <li className="group relative grid gap-2 p-3 border-[1px] border-tertiary rounded-lg">
            <SpotifyImage 
                src={bgImage}
                height={64}
                width={64}
                className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
            />
            <div 
                className="relative rounded-lg overflow-hidden group-hover:[--bg-opacity:.75]"
                style={{ 
                    '--bg-color': `rgb(${track.color})`, 
                    '--bg-with-opacity': `rgb(${track.color} / var(--bg-opacity, 0))` 
                } as CSSProperties}
            >
                <SpotifyImage 
                    src={image}
                    height={200}
                    width={200}
                    className="aspect-video"
                />
                <TopListTrackPreview
                    className="opacity-0 group-hover:opacity-100 p-2 absolute z-[3] top-0 left-0 w-full h-full flex justify-center items-center shadow-2xl duration-300 transition-[background-color,opacity] bg-[var(--bg-with-opacity)] before:bg-[var(--bg-color)] before:w-12 before:rounded-full before:aspect-square before:absolute before:z-[2]"
                    track={track}
                />
                <span className="absolute z-[3] top-1 right-2 text-4xl font-extrabold drop-shadow-[0_0px_2px_rgba(0,0,0,0.8)]">
                    {index}
                </span>
            </div>
            <div className="grid">
                <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {track.name}
                </span>
                <span className="text-xs text-secondary whitespace-nowrap overflow-hidden text-ellipsis">
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
        </li>
    )
}