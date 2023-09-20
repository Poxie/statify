"use client";
import ExploreBasedOn from './ExploreBasedOn';
import ExploreTracks from './ExploreTracks';
import ExploreInputs from './ExploreInputs';
import ExploreHeader from './ExploreHeader';
import { useState, useEffect, useMemo } from 'react';
import { SpotifyArtist, SpotifyTrack, SpotifyTrackWithColor } from '@/types';
import { get } from "@/utils";

export default function Explore() {
    const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
    const [artists, setArtists] = useState<SpotifyArtist[]>([]);
    
    const [recommendations, setRecommendations] = useState<SpotifyTrackWithColor[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!tracks.length && !artists.length) return setLoading(true);

        const url = new URL(`${window.location.origin}/recommendations`);
        url.searchParams.set('seed_artists', artists.map(artist => artist.id).join(','));
        url.searchParams.set('seed_tracks', tracks.map(track => track.id).join(','));
        
        setLoading(true);

        const abortController = new AbortController();
        get<SpotifyTrackWithColor[]>(`${url.pathname}${url.search}`, abortController.signal).then(recommendations => {
            setRecommendations(recommendations);
            
            setTimeout(() => {
                setLoading(false);
            }, 0)
        })

        return () => abortController.abort();
    }, [artists.length, tracks.length]);

    const basedOnItems = useMemo(() => ([...artists, ...tracks]), [tracks.length, artists.length]);
    return(
        <main className="pt-20">
            <ExploreHeader />
            <ExploreInputs 
                artists={artists}
                tracks={tracks}
                setArtists={setArtists}
                setTracks={setTracks}
            />
            <div className="w-main max-w-main mx-auto">
                <ExploreBasedOn items={basedOnItems} />
                <ExploreTracks 
                    tracks={recommendations}
                    loading={loading}
                />
            </div>
        </main>
    )
}