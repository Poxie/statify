import { get } from '@/utils';
import { useState, useEffect, useMemo } from 'react';

type SearchOptions = {
    waitBeforeFetch?: number;
}

const cache: {
    [path: string]: any[];
} = {};
const getInfoFromCache = (path: string) => cache[path];

const WAIT_BEFORE_FETCH = 250;
export const useSearch = <T>(
    path?: string,
    options: SearchOptions={
        waitBeforeFetch: WAIT_BEFORE_FETCH,
    }
) => {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<T[]>([]);

    useEffect(() => {
        if(!path) {
            setLoading(false);
            setResults([]);
            return;
        }

        const cachedInfo = getInfoFromCache(path);
        if(cachedInfo) return setResults(cachedInfo);

        setLoading(true);

        const abortController = new AbortController();
        const timeout = setTimeout(async () => {
            const results = await get<T[]>(path, abortController.signal);

            cache[path] = results;
            setResults(results);
            setLoading(false);
        }, options.waitBeforeFetch);

        return () => {
            abortController.abort();
            clearTimeout(timeout);
        }
    }, [path, options.waitBeforeFetch]);

    return {
        loading,
        results: results as T[],
    }
}