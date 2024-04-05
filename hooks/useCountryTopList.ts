import { useEffect, useState } from 'react';
import { SpotifyOwner, SpotifyTrack } from "@/types"
import { get } from '@/utils';

export type ToplistInfo = {
    playlistInfo: {
        name: string;
        href: string;
        owner: SpotifyOwner;
    },
    tracks: (SpotifyTrack & {
        color: string;
    })[];
}
type Options = {
    extraDuration?: number;
}

const cache: {[country: string]: ToplistInfo | undefined} = {};
const getInfoFromCache = (country: string) => cache[country];

const DEFAULT_EXTRA_DURATION = 0;
export const useCountryTopList = (country: string, options: Options={}) => {
    if(!options.extraDuration) options.extraDuration = DEFAULT_EXTRA_DURATION;

    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState<ToplistInfo | null>(null);

    useEffect(() => {
        setLoading(true);

        const timeouts: NodeJS.Timeout[] = [];
        let abortController: AbortController;
        let req: Promise<ToplistInfo>;
        
        const cachedInfo = getInfoFromCache(country);
        if(!cachedInfo) {
            abortController = new AbortController();
            req = get<ToplistInfo>(`/top-lists/${country}`, abortController.signal);
        }

        const startResultsTimeout = () => timeouts.push(setTimeout(() => setLoading(false), options.extraDuration));
        timeouts.push(setTimeout(() => {
            if(cachedInfo) {
                setInfo(cachedInfo);
                startResultsTimeout();
            } else {
                req?.then(info => {
                    setInfo(info);
                    startResultsTimeout();
                });
            }
        }, options.extraDuration));

        return () => {
            abortController?.abort();
            timeouts.forEach(clearTimeout);
        }
    }, [country]);

    return {
        loading,
        info
    }
}