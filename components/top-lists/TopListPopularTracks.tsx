import { SpotifyTrack } from "@/types";
import SpotifyImage from "../spotify-image";
import Link from "next/link";
import React, { CSSProperties } from "react";
import TopListTrackPreview from "./TopListTrackPreview";

export default function TopListPopularTracks({ colors, tracks }: {
    colors: string[] | undefined;
    tracks: (SpotifyTrack & {
        color: string | undefined
    })[];
}) {
    return(
        <div className="py-8 border-t-2 border-b-2 border-t-tertiary border-b-tertiary bg-secondary">
            <ul className="w-[800px] max-w-main mx-auto grid gap-2">
                {tracks.map((track, key) => {
                    const image = track.album.images.at(-1)?.url;
                    return(
                        <li
                            style={{'--bg-with-opacity': `rgb(${track.color} / var(--bg-opacity, 0))`} as CSSProperties}
                            className="p-3 relative border-[1px] border-tertiary rounded-lg flex justify-between hover:[--bg-opacity:.65]"
                            key={track.id}
                        >
                            <SpotifyImage 
                                src={image}
                                width={100}
                                height={100}
                                className="z-0 absolute top-0 left-0 w-full h-full opacity-10 after:duration-300 after:transition-colors after:bg-[var(--bg-with-opacity)] after:absolute after:top-0 after:left-0 after:w-full after:h-full"
                            />
                            <div className="relative z-[1] flex gap-3">
                                <div className="relative rounded-lg overflow-hidden">
                                    <SpotifyImage 
                                        src={image}
                                        width={100}
                                        height={100}
                                        className="w-28 aspect-square"
                                    />
                                    <TopListTrackPreview
                                        className="p-2 absolute z-[3] top-0 left-0 w-full h-full flex justify-center items-center shadow-2xl duration-300 transition-colors bg-[var(--bg-with-opacity)] before:bg-[var(--bg-color)] before:w-12 before:rounded-full before:aspect-square before:absolute before:z-[2]"
                                        style={track.color ? { '--bg-color': `rgb(${track.color})` } as CSSProperties : undefined}
                                        track={track}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-semibold">
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
                            <span className="relative z-[1] w-11 text-center text-6xl font-extrabold">
                                {key + 1}
                            </span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}