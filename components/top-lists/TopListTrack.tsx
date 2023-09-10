import React, { CSSProperties } from 'react';
import SpotifyImage from "../spotify-image";
import SpotifyTrackArtists from '../spotify-track-artists';
import SpotifyTrackName from '../spotify-track-name';
import SpotifyTrackImage from '../spotify-track-image';
import { SpotifyPlaylist } from "@/types";
import clsx from "clsx";

export default function _TopListTrack({ track, index, small }: {
    track: SpotifyPlaylist['tracks']['items'][number]['track'];
    index: number;
    small?: boolean;
}) {
    const image = track.album.images.at(-1)?.url;
    return(
        <div 
            className={clsx(
                "group p-3 relative flex rounded-lg overflow-hidden hover:[--bg-opacity:.75]",
                small ? 'flex-col gap-2' : 'flex-col gap-3 sm:flex-row',
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
                    className={"text-center text-6xl w-11 leading-[54px] top-5 translate-y-0.5 sm:top-3 sm:translate-y-0"}
                    index={index}
                />
            )}
            <div className={clsx(
                "relative",
                small ? 'aspect-video' : 'aspect-square w-20 sm:w-28',
            )}>
                <SpotifyTrackImage 
                    height={100}
                    width={100}
                    track={track}
                    src={track.album.images.at(-1)?.url}
                    imageClassName={clsx(
                        "border-4 border-[var(--bg-color)]",
                        small ? 'aspect-video' : 'aspect-square',
                    )}
                    buttonClassName={clsx(
                        "p-4 duration-300 transition-[opacity,background-color] opacity-0 group-hover:opacity-100 rounded-md bg-[var(--bg-with-opacity)]",
                        "after:w-12 after:aspect-square after:rounded-full after:bg-[var(--bg-color)] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-2/4 after:-translate-y-2/4",
                    )}
                />
                {small && (
                    <TopListIndex 
                        className={"[--stroke-width:2px] text-right text-4xl leading-[32px]"}
                        index={index}
                    />
                )}
            </div>
            <div className="flex flex-col relative z-[2]">
                <SpotifyTrackName 
                    className={clsx(
                        "font-semibold overflow-hidden text-ellipsis whitespace-nowrap",
                        small ? 'text-sm' : 'text-xl',
                    )}
                    track={track}
                />
                <SpotifyTrackArtists artists={track.artists} />
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
                "[--stroke-color:var(--bg-color)] text-border absolute z-[1] top-3 right-3 font-extrabold",
                className,
            )}
        >
            {index}
        </span>
    )
}