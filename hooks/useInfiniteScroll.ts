import { get } from '@/utils';
import { useCallback, useState, useEffect, useRef, RefObject } from 'react';

type Options = {
    scrollContainer: typeof window | RefObject<HTMLElement>;
    scrollThreshold: number;
}

const DEFAULT_SCROLL_THRESHOLD = 200;
export const useInfiniteScroll = <T>(query: string, options: Partial<Options>={}) => {
    if(!options.scrollContainer) options.scrollContainer = window;
    if(options.scrollThreshold === undefined) options.scrollThreshold = DEFAULT_SCROLL_THRESHOLD;
    const { scrollThreshold, scrollContainer } = options;

    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<T[]>([]);
    const fetching = useRef(false);

    const fetchItems = useCallback(async (query: string, signal?: AbortSignal) => {
        fetching.current = true;
        const results = await get<T[]>(query, signal);
        fetching.current = false;
        return results;
    }, [setLoading, setResults]);
    useEffect(() => {
        setLoading(true);
        if(!query) return setResults([]);

        const abortController = new AbortController();
        fetchItems(query, abortController.signal)
            .then(results => {
                setResults(results);
                setLoading(false);
            })

        return () => abortController.abort();
    }, [query]);

    const scrollThresholdMet = useCallback(() => {
        const container = 'current' in scrollContainer ? scrollContainer.current : scrollContainer;
        if(!container) return;

        const scroll = 'scrollHeight' in container ? container.scrollHeight - container.scrollTop - container.clientHeight : container.innerHeight + container.scrollY;
        const height = 'innerHeight' in container ? document.body.offsetHeight : container.offsetHeight;
        
        return scroll + scrollThreshold >= height
    }, [query, scrollThreshold, scrollContainer]);
    useEffect(() => {
        const container = 'current' in scrollContainer ? scrollContainer.current : scrollContainer;

        const onScroll = async () => {
            if(!query) return setLoading(true);
            if(scrollThresholdMet() && !fetching.current) {
                const results = await fetchItems(query);
                setResults(prev => [...prev, ...results]);
            }
        }

        container?.addEventListener('scroll', onScroll);
        return () => container?.removeEventListener('scroll', onScroll);
    }, [query, scrollThreshold, scrollContainer]);

    return { loading, results };
}