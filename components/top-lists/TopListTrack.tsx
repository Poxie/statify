import React, { CSSProperties } from 'react';
import clsx from "clsx";
import Link from 'next/link';
import SpotifyImage from "../spotify-image";
import TopListTrackPreview from "./TopListTrackPreview";
import { SpotifyAlbum, SpotifyPlaylist } from "@/types";

export default function _TopListTrack({ track, index, small }: {
    track: SpotifyPlaylist['tracks']['items'][number]['track'];
    index: number;
    small?: boolean;
}) {
    const image = track.album.images.at(-1)?.url;
    return(
        <div 
            className={clsx(
                "group p-3 relative flex rounded-lg overflow-hidden hover:[--bg-opacity:.7]",
                small ? 'flex-col gap-2' : 'gap-3',
            )}
            style={{
                '--bg-color': `rgb(${track.color})`,
                '--bg-with-opacity': `rgb(${track.color} / var(--bg-opacity, 0))`,
            } as CSSProperties}
        >
            <SpotifyImage
                className="absolute top-0 left-0 w-full h-full opacity-10 after:absolute after:w-full after:h-full after:top-0 after:left-0 after:duration-300 after:transition-colors after:bg-[var(--bg-with-opacity)]" 
                src={image}
                width={100}
                height={100}
            />
            {!small && (
                <TopListIndex 
                    className={"text-6xl w-11"}
                    index={index}
                />
            )}
            <div className={clsx(
                "relative rounded-lg overflow-hidden",
                small ? 'aspect-video' : 'aspect-square w-28',
            )}>
                <SpotifyImage 
                    src={image}
                    width={100}
                    height={100}
                />
                <TopListTrackPreview 
                    track={track}
                    className={clsx(
                        "p-4 absolute top-0 left-0 w-full h-full flex items-center justify-center duration-300 transition-[opacity,background-color] opacity-0 group-hover:opacity-100 bg-[var(--bg-with-opacity)]",
                        "after:w-12 after:aspect-square after:rounded-full after:bg-[var(--bg-color)] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-2/4 after:-translate-y-2/4",
                    )}
                />
                {small && (
                    <TopListIndex 
                        className={"[--stroke-width:2px] text-4xl"}
                        index={index}
                    />
                )}
            </div>
            <div className="flex flex-col relative z-[2]">
                <span className={clsx(
                    "font-semibold overflow-hidden text-ellipsis whitespace-nowrap",
                    small ? 'text-sm' : 'text-xl',
                )}>
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
    )
}

function TopListIndex({ index, className }: {
    index: number;
    className: string;
}) {
    return(
        <span
            className={clsx(
                "text-border absolute z-[1] top-2 right-3 text-center font-extrabold",
                className,
            )}
        >
            {index}
        </span>
    )
}