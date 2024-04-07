import Artists from '@/assets/json/defaultArtists.json'
import { SpotifyAlbum, SpotifyTrack } from '@/types';
import { cache } from "react";

export const get = cache(async <T>(query: string, signal?: AbortSignal) => {
    let res = await fetch(query, { signal })

    const data = await res.json();
    if(data.error) {
        throw new Error(data.error.message);
    }

    return data as T;
})
export const getWithToken = async <T>(query: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(query, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const data = await res.json();
    if(!res.ok) {
        // Remove this for refresh token implementation later
        if(res.status === 401) {
            window.location.href = getLoginUrl();
        }
        throw new Error(data.error.message);
    }

    return data as T;
}

export const getRandomArtist = (excludeId?: string) => {
    const includedArtists = Artists.filter(a => a.id !== excludeId);
    return includedArtists[Math.floor(Math.random() * includedArtists.length)].id;
}

// Determining the artist's top album by checking the most occuring album among their top tracks.
export const getTopAlbumFromTracks = (tracks: SpotifyTrack[] | undefined, albums: SpotifyAlbum[] | undefined) => {
    let firstAlbum = albums?.at(0);
    if(tracks?.length) {
        const topTrackAlbums = tracks.map(track => track.album);
        const topTrackAlbumIds = topTrackAlbums.map(album => album.id);
        const firstAlbumId = (
            topTrackAlbumIds
                .sort((a,b) => (
                    topTrackAlbumIds.filter(i => i === a).length -
                    topTrackAlbumIds.filter(i => i === b).length
                )
        ).pop());
        firstAlbum = topTrackAlbums.find(album => album.id === firstAlbumId);
    }
    return firstAlbum;
}

// Auth related functions
export const getLoginUrl = () => {
    const scopes = [
        'user-read-private',
        'user-top-read',
    ].join(' ');
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const redirectUri = `${window.location.origin}/profile`;
    
    return `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
}