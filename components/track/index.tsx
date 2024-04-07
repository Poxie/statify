import React from 'react';
import SpotifyTrackImage from "../spotify-track-image";
import { SpotifyTrack } from "@/types";
import SpotifyTrackName from '../spotify-track-name';
import SpotifyTrackArtists from '../spotify-track-artists';
import { twMerge } from 'tailwind-merge';

export default function Track({ track, className, imageContainerClassName, imageClassName, trackNameClassName, artistClassName }: {
    track: SpotifyTrack | undefined;
    imageContainerClassName?: string;
    imageClassName?: string;
    className?: string;
    trackNameClassName?: string;
    artistClassName?: string;
}) {
    if(!track) return(
        <div className="w-14 aspect-square">

        </div>
    )

    return(
        <div 
            className={twMerge(
                "group flex gap-3",
                className,
            )}
        >
            <SpotifyTrackImage
                containerClassName={imageContainerClassName}
                imageClassName={twMerge(
                    "min-w-[3.5rem] w-14 aspect-square rounded-md",
                    imageClassName,
                )}
                src={track.album.images.at(-1)?.url} 
                track={track}
                height={100}
                width={100}
            />
            <div className="flex flex-col overflow-hidden">
                <SpotifyTrackName 
                    track={track}
                    className={twMerge(
                        "text-sm",
                        trackNameClassName,
                    )}
                />
                <SpotifyTrackArtists 
                    artists={track.artists}
                    className={artistClassName}
                />
            </div>
        </div>
    )
}