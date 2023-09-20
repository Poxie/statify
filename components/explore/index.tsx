"use client";
import ExploreBasedOn from './ExploreBasedOn';
import ExploreTracks from './ExploreTracks';
import ExploreInputs from './ExploreInputs';
import ExploreHeader from './ExploreHeader';
import { useState, useMemo } from 'react';
import { SpotifyArtist, SpotifyTrack, SpotifyTrackWithColor } from '@/types';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export default function Explore() {
    const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
    const [artists, setArtists] = useState<SpotifyArtist[]>([]);
    
    const url = new URL(`${window.location.origin}/recommendations`);
    url.searchParams.set('seed_artists', artists.map(artist => artist.id).join(','));
    url.searchParams.set('seed_tracks', tracks.map(track => track.id).join(','));
    
    const disabled = !artists.length && !tracks.length;
    const { results, loading } = useInfiniteScroll<SpotifyTrackWithColor>(!disabled ? `${url.pathname}${url.search}` : '');

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
                    tracks={results}
                    loading={loading}
                />
            </div>
        </main>
    )
}