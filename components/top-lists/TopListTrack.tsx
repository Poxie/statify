"use client";
import React from 'react';
import SpotifyImage from "../spotify-image";
import { SpotifyTrack } from "@/types";
import Link from 'next/link';
import { usePreview } from '@/contexts/preview';
import { usePreviewPause } from '@/hooks/usePreviewPause';
import { PlayIcon } from '@/assets/icons/PlayIcon';
import { PauseIcon } from '@/assets/icons/PauseIcon';

export default function TopListTrack({ track, index }: {
    track: SpotifyTrack;
    index: number;
}) {
    const { track: previewTrack, setTrack } = usePreview();
    const { paused, togglePause } = usePreviewPause();

    const bgImage = track.album.images.at(-1)?.url;
    const image = track.album.images.at(0)?.url;

    const isPreviewTrack = previewTrack?.id === track.id;
    return(
        <li className="relative grid gap-2 p-3 border-[1px] border-tertiary rounded-lg">
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
            <div className="flex items-center gap-2">
                <button
                    disabled={!track.preview_url}
                    aria-label={(isPreviewTrack && paused) || !isPreviewTrack ? (
                        `Play ${track.name}`
                    ) : (
                        `Pause ${track.name}`
                    )}
                    onClick={() => {
                        if(isPreviewTrack) return togglePause();
                        if(!track.preview_url) return;
                        setTrack(track);
                    }}
                >
                    {!isPreviewTrack || paused ? (
                        <PlayIcon className="w-8" />
                    ) : (
                        <PauseIcon className="w-8" />
                    )}
                </button>
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
            </div>
        </li>
    )
}