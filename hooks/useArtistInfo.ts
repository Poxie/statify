import { useEffect, useState } from 'react';
import { SpotifyAlbum, SpotifyArtist, SpotifyFeaturedAlbum, SpotifyOwner, SpotifyTrack } from "@/types"
import { get } from '@/utils';

export type ArtistInfo = {
    artist: SpotifyArtist;
    tracks: SpotifyTrack[];
    albums: SpotifyAlbum[];
    featured: SpotifyFeaturedAlbum[];
    relatedArtists: SpotifyArtist[];
    relatedTracks: SpotifyTrack[];
}
type Options = {
    extraDuration?: number;
}

const cache: {[artistId: string]: ArtistInfo | undefined} = {};
const getInfoFromCache = (artistId: string) => cache[artistId];

const DEFAULT_EXTRA_DURATION = 0;
export const useArtistInfo = (artistId: string | null, options: Options={}) => {
    if(!options.extraDuration) options.extraDuration = DEFAULT_EXTRA_DURATION;

    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState<ArtistInfo | null>(null);

    useEffect(() => {
        setLoading(true);
        if(!artistId) return;

        const timeouts: NodeJS.Timeout[] = [];
        let abortController: AbortController | undefined;
        let reqs: Promise<[
            SpotifyArtist,
            SpotifyTrack[],
            SpotifyAlbum[],
            SpotifyFeaturedAlbum[],
            SpotifyArtist[],
            SpotifyTrack[],
        ]> | undefined;
        
        const cachedInfo = getInfoFromCache(artistId);
        if(!cachedInfo) {
            abortController = new AbortController();
            const signal = abortController.signal;

            reqs = Promise.all([
                get<SpotifyArtist>(`/artist/${artistId}`, signal),
                get<SpotifyTrack[]>(`/artist/${artistId}/tracks`, signal),
                get<SpotifyAlbum[]>(`/artist/${artistId}/albums`, signal),
                get<SpotifyFeaturedAlbum[]>(`/artist/${artistId}/featured`, signal),
                get<SpotifyArtist[]>(`/artist/${artistId}/related`, signal),
                get<SpotifyTrack[]>(`/artist/${artistId}/related-tracks`),
            ])
        }

        const startResultsTimeout = () => timeouts.push(setTimeout(() => setLoading(false), options.extraDuration));
        timeouts.push(setTimeout(() => {
            if(cachedInfo) {
                setInfo(cachedInfo);
                startResultsTimeout();
            } else {
                reqs?.then(([artist, tracks, albums, featured, relatedArtists, relatedTracks]) => {
                    const info = {
                        artist,
                        tracks,
                        albums,
                        featured,
                        relatedArtists,
                        relatedTracks,
                    }

                    setInfo(info);
                    cache[artistId] = info;
                    startResultsTimeout();
                });
            }
        }, options.extraDuration));

        return () => {
            abortController?.abort();
            timeouts.forEach(clearTimeout);
        }
    }, [artistId]);

    return {
        loading,
        info
    }
}