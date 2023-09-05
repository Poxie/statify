import Input from "../input";
import { AnimatePresence, motion } from 'framer-motion';
import { SpotifyArtist, SpotifyTrack } from "@/types";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { useState, useEffect, useMemo } from "react";
import { get } from "@/utils";
import SearchResult from "./SearchResult";

const WAIT_BEFORE_FETCH = 150;
export default function SearchInput<T>({ onSelect, type }: {
    onSelect: (item: T) => void;
    type: 'artist' | 'track';
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<(SpotifyArtist | SpotifyTrack)[]>([]);

    useEffect(() => {
        if(!query.trim()) return setResults([]);
        setLoading(true);

        const abortController = new AbortController();
        const timeout = setTimeout(() => {
            get<(SpotifyArtist | SpotifyTrack)[]>(`/search?q=${query}&type=${type}`, abortController.signal).then(results => {
                setLoading(false);
                setResults(results);
            });
        }, WAIT_BEFORE_FETCH);

        return () => {
            abortController.abort();
            clearTimeout(timeout);
        }
    }, [query]);

    const sortedResults = useMemo(() => (
        results
            .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
            .sort((a,b) => {
                if(type === 'artist') {
                    return (b as SpotifyArtist).followers.total - (a as SpotifyArtist).followers.total
                }
                return b.popularity - a.popularity;
            })
    ), [results]);

    return(
        <div className="relative max-w-full">
            <Input
                containerClassName={'w-[400px] max-w-full'}
                icon={<SearchIcon className="w-5 text-secondary" />}
                placeholder={'Search artist or song...'}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                onChange={setQuery}
            />
            <AnimatePresence>
                {open && (
                    <motion.ul 
                        exit={{ scale: .98, opacity: 0 }}
                        initial={{ scale: .98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: .15, bounce: false }}
                        className="max-h-[220px] w-full p-2 pr-0 overflow-auto scrollbar absolute z-10 top-[calc(100%+.5rem)] bg-secondary border-[1px] border-tertiary rounded-lg"
                    >
                        {!sortedResults.length && (
                            <span className="block text-xs text-secondary">
                                {!loading ? (
                                    !query ? (
                                        `Enter the name of your favorite ${type}`
                                    ) : (
                                        'No results were found.'
                                    )
                                ) : (
                                    'Loading results...'
                                )}
                            </span>
                        )}
                        {sortedResults.map(item => {
                            let image = '';
                            if(type === 'artist') image = (item as SpotifyArtist).images.at(-1)?.url as string;
                            if(type === 'track') image = (item as SpotifyTrack).album.images.at(-1)?.url as string;

                            let extraText = '';
                            if(type === 'artist') extraText = `${(item as SpotifyArtist).followers.total.toLocaleString()} followers`;
                            if(type === 'track') extraText = `with ${(item as SpotifyTrack).artists[0].name}`;

                            return(
                                <SearchResult 
                                    name={item.name}
                                    image={image}
                                    extraText={extraText}
                                    onSelect={() => onSelect(item as T)}
                                    key={item.id}
                                />
                            )
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}