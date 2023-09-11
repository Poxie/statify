import { SpotifyArtist, SpotifyTrack } from '@/types';
import { get } from '@/utils';
import { useState, useEffect } from 'react';

type SearchType = 'track' | 'artist';
type SearchResult = SpotifyTrack | SpotifyArtist;
type SearchOptions = {
    waitBeforeFetch: number;
}

const cache: {
    [key in SearchType]: {
        [query: string]: SearchResult[];
    }
} = {
    track: {},
    artist: {},
};
const getInfoFromCache = (type: SearchType, query: string) => cache[type][query];

const WAIT_BEFORE_FETCH = 250;
export const useSearch = <T>(
    type: SearchType, 
    query: string, 
    options: SearchOptions={
        waitBeforeFetch: WAIT_BEFORE_FETCH,
    }
) => {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);

    useEffect(() => {
        if(!query) {
            setLoading(false);
            setResults([]);
            return;
        }

        const cachedInfo = getInfoFromCache(type, query);
        if(cachedInfo) return setResults(cachedInfo);

        setLoading(true);

        const abortController = new AbortController();
        const timeout = setTimeout(async () => {
            const results = await get<SearchResult[]>(`/search?type=${type}&q=${query}`, abortController.signal);

            const sortedResults = (
                results
                    .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
                    .sort((a,b) => {
                        if(type === 'artist') {
                            return (b as SpotifyArtist).followers.total - (a as SpotifyArtist).followers.total
                        }
                        return b.popularity - a.popularity;
                    })
            )

            cache[type][query] = sortedResults;
            setResults(sortedResults);
            setLoading(false);
        }, options.waitBeforeFetch);

        return () => {
            abortController.abort();
            clearTimeout(timeout);
        }
    }, [type, query, options.waitBeforeFetch]);

    return {
        loading,
        results: results as T[],
    }
}