"use client";
import ExploreInput from "./ExploreInput";
import { useState } from 'react';
import { SpotifyArtist, SpotifyTrack } from '@/types';
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config';

const background = resolveConfig(tailwindConfig).theme?.backgroundColor?.primary;

export default function Explore() {
    const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
    const [artists, setArtists] = useState<SpotifyArtist[]>([]);

    return(
        <main className="pt-20">
            <div className="text-center flex flex-col gap-4">
                <h1 className="text-4xl font-semibold">
                    Explore with us.
                </h1>
                <p className="text-lg text-secondary">
                    Find songs you might like based on your favorite songs, artists, and genres!
                </p>
            </div>
            <div 
                className="my-8 gradient-border [--border-left:0] [--border-right:0]"
                style={{ '--background': background } as React.CSSProperties}
            >
                <div className="py-8">
                    <div className="w-[900px] max-w-main mx-auto">
                        <div className="flex gap-2">
                            <ExploreInput<SpotifyArtist> 
                                type={'artist'}
                                items={artists}
                                onItemAdd={artist => setArtists(prev => prev.concat(artist))}
                                onItemRemove={artistId => setArtists(prev => prev.filter(item => item.id !== artistId))}
                            />
                            <ExploreInput<SpotifyTrack> 
                                type={'track'}
                                items={tracks}
                                onItemAdd={track => setTracks(prev => prev.concat(track))}
                                onItemRemove={trackId => setTracks(prev => prev.filter(item => item.id !== trackId))}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}