"use client";
import ExploreBasedOn from './ExploreBasedOn';
import ExploreTracks from './ExploreTracks';
import ExploreInputs from './ExploreInputs';
import ExploreHeader from './ExploreHeader';
import { useState, useMemo, useEffect } from 'react';
import { SpotifyArtist, SpotifyTrack, SpotifyTrackWithColor } from '@/types';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export default function Explore() {
    const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
    const [artists, setArtists] = useState<SpotifyArtist[]>([]);
    const disabled = !artists.length && !tracks.length;
    
    const url = new URL(`${window.location.origin}/recommendations`);
    url.searchParams.set('seed_artists', artists.map(artist => artist.id).join(','));
    url.searchParams.set('seed_tracks', tracks.map(track => track.id).join(','));
    
    const { results, loading } = useInfiniteScroll<SpotifyTrackWithColor>(!disabled ? `${url.pathname}${url.search}` : '');
    
    // Scrolling to top and disabling overflow on deselect
    if(disabled) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.scrollBehavior = 'smooth';
        setTimeout(() => {
            window.scrollTo({ top: 0 });
            document.documentElement.style.scrollBehavior = '';
        }, 0);
    } else {
        document.body.style.overflow = '';
        document.body.style.scrollBehavior = '';
    }
    // Making sure overflow is returned to normal on unmount
    useEffect(() => () => {document.body.style.overflow = ''}, [])

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