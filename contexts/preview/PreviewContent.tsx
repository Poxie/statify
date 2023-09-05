import React from 'react';
import SpotifyImage from "@/components/spotify-image";
import { usePreview } from ".";
import Link from 'next/link';
import PreviewControls from './PreviewControls';
import PreviewVolume from './PreviewVolume';

export default function PreviewContent() {
    const { track } = usePreview();
    
    return(
        <div className="grid items-center gap-3 grid-cols-5">
            <div className="flex items-center gap-3">
                <SpotifyImage 
                    className="w-16 aspect-square"
                    src={track?.album.images.at(-1)?.url}
                    width={100}
                    height={100}
                />
                <div className="flex flex-col gap-0.5">
                    <span className="font-bold -mt-1">
                        {track?.name}
                    </span>
                    <span className="text-xs text-secondary">
                        by{' '}
                        {track?.artists.map((artist, key) => (
                            <React.Fragment key={artist.id}>
                                <Link 
                                    href={`/?a=${artist.id}`}
                                    className="transition-colors hover:text-primary"
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
            <PreviewControls />
            <PreviewVolume />
        </div>
    )
}