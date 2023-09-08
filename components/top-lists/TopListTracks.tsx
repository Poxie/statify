import React from 'react';
import { SpotifyOwner, SpotifyTrack } from "@/types";
import SpotifyImage from "../spotify-image";
import TopListTrack from './TopListTrack';
import Link from 'next/link';

export default function TopListTracks({ tracks, playlistName, playlistHref, owner }: {
    tracks: SpotifyTrack[];
    playlistName: string;
    playlistHref: string;
    owner: SpotifyOwner;
}) {
    return(
        <div className="py-8 border-t-2 border-b-2 border-t-tertiary border-b-tertiary bg-secondary">
            <div className="w-main max-w-main mx-auto">
                <ul className="grid grid-cols-5 gap-3">
                    {tracks.slice(0,15).map((track, key) => (
                        <TopListTrack 
                            track={track}
                            index={key + 1}
                            key={track.id}
                        />
                    ))}
                </ul>
                <span className="block mt-3 text-xs text-secondary text-right">
                    Based on{' '}
                    <Link 
                        className="transition-colors hover:text-primary"
                        href={playlistHref}
                        target="_blank"
                    >
                        {playlistName}
                    </Link>
                    {' '} by{' '}
                    <Link 
                        className="transition-colors hover:text-primary"
                        href={owner.external_urls.spotify}
                        target="_blank"
                    >
                        {owner.display_name}
                    </Link>
                </span>
            </div>
        </div>
    )
}