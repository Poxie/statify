import SpotifyImage from '@/components/spotify-image';
import React from 'react';
import { usePreview } from '.';
import Link from 'next/link';

export default function PreviewTrack() {
    const { track } = usePreview();

    return(
        <div className="flex items-center gap-3">
            <SpotifyImage 
                className="w-12 aspect-square"
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
    )
}