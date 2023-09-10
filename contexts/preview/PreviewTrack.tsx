import SpotifyImage from '@/components/spotify-image';
import React from 'react';
import { usePreview } from '.';
import Link from 'next/link';
import SpotifyTrackArtists from '@/components/spotify-track-artists';

export default function PreviewTrack() {
    const { track } = usePreview();

    return(
        <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
            <SpotifyImage 
                className="w-12 min-w-[3rem] aspect-square"
                src={track?.album.images.at(-1)?.url}
                width={100}
                height={100}
            />
            <div className="flex flex-col gap-0.5 overflow-hidden">
                <span className="font-bold -mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {track?.name}
                </span>
                <SpotifyTrackArtists artists={track?.artists || []} />
            </div>
        </div>
    )
}