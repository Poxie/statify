import React from 'react';
import TopListTrack from './TopListTrack';
import { SpotifyOwner, SpotifyPlaylist, SpotifyTrack } from "@/types";
import Link from 'next/link';

const INITIAL_INDEX = 6;
export default function TopListTracks({ tracks, playlistName, playlistHref, owner }: {
    tracks: SpotifyPlaylist['tracks']['items'][number]['track'][];
    playlistName: string;
    playlistHref: string;
    owner: SpotifyOwner;
}) {
    return(
        <div className="w-main max-w-main mx-auto">
            <ul className="grid grid-cols-5 gap-3">
                {tracks.slice(0,15).map((track, key) => (
                    <TopListTrack 
                        track={track}
                        index={INITIAL_INDEX + key}
                        small
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
    )
}