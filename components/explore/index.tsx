"use client";
import ExploreBasedOn from './ExploreBasedOn';
import ExploreTracks from './ExploreTracks';
import ExploreInputs from './ExploreInputs';
import ExploreHeader from './ExploreHeader';
import { useState, useMemo, useEffect } from 'react';
import { SpotifyArtist, SpotifyTrack, SpotifyTrackWithColor } from '@/types';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export default function Explore() {
    const [genres, setGenres] = useState<string[]>([]);
    const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
    const [artists, setArtists] = useState<SpotifyArtist[]>([]);
    const disabled = !artists.length && !tracks.length && !genres.length;
    
    const url = new URL(`${window.location.origin}/recommendations`);
    url.searchParams.set('seed_artists', artists.map(artist => artist.id).join(','));
    url.searchParams.set('seed_tracks', tracks.map(track => track.id).join(','));
    url.searchParams.set('seed_genres', genres.join(','));
    
    const query = `${url.pathname}${url.search}`;
    const { results, loading } = useInfiniteScroll<SpotifyTrackWithColor>(!disabled ? query : '');
    
    // Scrolling to top and disabling overflow on deselect
    if(disabled) {
        document.documentElement.style.scrollBehavior = 'smooth';
        setTimeout(() => {
            window.scrollTo({ top: 0 });
            document.documentElement.style.scrollBehavior = '';
        }, 0);
    }

    const basedOnItems = useMemo(() => ([...artists, ...tracks, ...genres]), [tracks.length, artists.length, genres.length]);
    return(
        <main className="pt-20">
            <ExploreHeader />
            <ExploreInputs 
                genres={genres}
                artists={artists}
                tracks={tracks}
                setGenres={setGenres}
                setArtists={setArtists}
                setTracks={setTracks}
            />
            <div className="w-main max-w-main mx-auto">
                <ExploreBasedOn 
                    items={basedOnItems}
                    setTracks={setTracks}
                    setArtists={setArtists}
                    setGenres={setGenres}
                />
                <ExploreTracks 
                    tracks={results}
                    loading={loading}
                />
            </div>
        </main>
    )
}