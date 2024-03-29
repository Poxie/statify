import React, { CSSProperties, useRef } from 'react';
import SpotifyImage from "../spotify-image";
import SpotifyTrackArtists from '../spotify-track-artists';
import SpotifyTrackName from '../spotify-track-name';
import SpotifyTrackImage from '../spotify-track-image';
import { useAnimateStyle } from '@/hooks/useAnimateStyle';
import { ToplistInfo } from '@/hooks/useCountryTopList';
import clsx from "clsx";

export default function TopListTrack({ track, loading, index, small=false, showIndex=true }: {
    track: ToplistInfo['tracks'][number];
    loading: boolean;
    index: number;
    small?: boolean;
    showIndex?: boolean;
}) {
    const ref = useRef<HTMLLIElement>(null);

    const { initialStyle } = useAnimateStyle(ref, loading, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delayIn: index * 100,
    })
    return(
        <li 
            className={clsx(
                "group p-3 relative flex rounded-lg hover:[--bg-opacity:.75] border-[1px] border-[var(--bg-color)]",
                small ? 'flex-col gap-2' : 'flex-col gap-1 sm:gap-3 sm:flex-row md:last:col-span-2',
            )}
            style={{
                '--bg-color': `rgb(${track.color})`,
                '--bg-with-opacity': `rgb(${track.color} / var(--bg-opacity, 0))`,
                ...initialStyle,
            } as CSSProperties}
            ref={ref}
        >
            <SpotifyImage
                className="absolute top-0 left-0 w-full h-full opacity-10 after:absolute after:w-full after:h-full after:top-0 after:left-0 after:duration-300 after:transition-colors after:bg-[var(--bg-with-opacity)]" 
                src={track.album.images.at(-1)?.url}
                width={100}
                height={100}
            />
            <div className={clsx(
                "relative",
                small ? 'aspect-video' : 'aspect-square w-20 sm:w-24',
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
                {small && showIndex && (
                    <TopListIndex 
                        className={"[--stroke-width:2px] absolute z-[1] top-3 right-3 text-right text-4xl leading-[32px]"}
                        index={index}
                    />
                )}
            </div>
            <div className="flex-1 flex flex-col relative z-[2] overflow-hidden">
                <SpotifyTrackName 
                    className={small ? 'text-sm' : 'text-lg max-w-full'}
                    track={track}
                />
                <SpotifyTrackArtists artists={track.artists} />
            </div>
            {!small && showIndex && (
                <TopListIndex 
                    className={"text-center text-6xl leading-[54px] w-10 absolute top-4 right-4 md:relative md:top-[unset] md:right-[unset]"}
                    index={index}
                />
            )}
        </li>
    )
}

function TopListIndex({ index, className }: {
    index: number;
    className: string;
}) {
    return(
        <span
            className={clsx(
                "[--stroke-color:var(--bg-color)] text-border font-extrabold",
                className,
            )}
        >
            {index}
        </span>
    )
}