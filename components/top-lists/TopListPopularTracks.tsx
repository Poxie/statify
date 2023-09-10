import { SpotifyTrack } from "@/types";
import SpotifyImage from "../spotify-image";
import Link from "next/link";
import React from "react";
import TopListTrackPreview from "./TopListTrackPreview";

export default function TopListPopularTracks({ colors, tracks }: {
    colors: string[] | undefined;
    tracks: SpotifyTrack[];
}) {
    return(
        <div className="py-8 border-t-2 border-b-2 border-t-tertiary border-b-tertiary bg-secondary">
            <ul className="w-[800px] max-w-main mx-auto grid gap-2">
                {tracks.map((track, key) => {
                    const image = track.album.images.at(-1)?.url;
                    return(
                        <li
                            className="p-3 relative border-[1px] border-tertiary rounded-lg flex justify-between"
                            key={track.id}
                        >
                            <SpotifyImage 
                                src={image}
                                width={100}
                                height={100}
                                className="z-0 absolute top-0 left-0 w-full h-full opacity-10"
                            />
                            <div className="relative z-[1] flex gap-3">
                                <div className="relative">
                                    <SpotifyImage 
                                        src={image}
                                        width={100}
                                        height={100}
                                        className="w-28 aspect-square rounded-lg"
                                    />
                                    <TopListTrackPreview 
                                        className="p-2 absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 bg-tertiary rounded-full shadow-2xl transition-opacity hover:bg-opacity-90"
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