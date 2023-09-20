"use client";
import Button from "../button";
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config';
import ExploreInput from "./ExploreInput";
import TopListTrack from '@/components/top-lists/TopListTrack';
import { useState } from 'react';
import { SpotifyArtist, SpotifyTrack, SpotifyTrackWithColor } from '@/types';
import { get } from "@/utils";

const background = resolveConfig(tailwindConfig).theme?.backgroundColor?.primary;

export default function Explore() {
    const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
    const [artists, setArtists] = useState<SpotifyArtist[]>([]);
    const [loading, setLoading] = useState(false);
    
    const [recommendations, setRecommendations] = useState<SpotifyTrackWithColor[]>([]);

    const getRecommendations = () => {
        const url = new URL(`${window.location.origin}/recommendations`);
        url.searchParams.set('seed_artists', artists.map(artist => artist.id).join(','));
        url.searchParams.set('seed_tracks', tracks.map(track => track.id).join(','));
        
        setLoading(true);
        get<SpotifyTrackWithColor[]>(`${url.pathname}${url.search}`).then(recommendations => {
            setRecommendations(recommendations);
            
            setTimeout(() => {
                setLoading(false);
            }, 0)
        })
    }

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
                        <div className="mt-3 flex justify-end">
                            <Button
                                className="py-3 text-xs"
                                disabled={loading || (!tracks.length && !artists.length)}
                                onClick={getRecommendations}
                            >
                                Get recommendations
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-main max-w-main mx-auto grid grid-cols-5 gap-3">
                {recommendations.map((track, index) => (
                    <TopListTrack
                        index={index}
                        track={track}
                        loading={loading}
                        showIndex={false}
                        small
                    />
                ))}
            </div>
        </main>
    )
}