import React from 'react';
import Link from "next/link";
import { SpotifyArtist } from "@/types";
import clsx from 'clsx';

export default function SpotifyTrackArtists({ artists, className, artistClassName }: {
    artists: SpotifyArtist[];
    artistClassName?: string;
    className?: string;
}) {
    return(
        <span 
            className={clsx(
                "text-xs text-secondary whitespace-nowrap text-ellipsis overflow-hidden",
                className,
            )}
        >
            by {artists.map((artist, key) => (
                <React.Fragment key={artist.id}>
                    <Link
                        className={clsx(
                            "transition-colors hover:text-primary",
                            artistClassName,
                        )}
                        href={`/?a=${artist.id}`}
                        scroll={false}
                    >
                        {artist.name}
                    </Link>
                    {key !== artists.length - 1 && ', '}
                </React.Fragment>
            ))}
        </span>
    )
}