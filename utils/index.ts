import Countries from '@/assets/json/countries.json';
import Artists from '@/assets/json/defaultArtists.json'
import { SpotifyAlbum, SpotifyTrack } from '@/types';
import { cache } from "react";

export const get = cache(async <T>(query: string, signal?: AbortSignal) => {
    const res = await fetch(query, { signal });
    const data = await res.json();

    if(data.error) {
        throw new Error(data.error.message);
    }
    return data as T;
})

export const getRandomArtist = (excludeId?: string) => {
    const includedArtists = Artists.filter(a => a.id !== excludeId);
    return includedArtists[Math.floor(Math.random() * includedArtists.length)].id;
}

export const getCountryColors = (country: string | null) => {
    if(!country) return;
    return Countries.find(c => c.name.toLowerCase() === country.toLowerCase())?.colors;
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