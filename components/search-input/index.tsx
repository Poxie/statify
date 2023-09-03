import Input from "../input";
import { AnimatePresence, motion } from 'framer-motion';
import { SpotifyArtist, SpotifyTrack } from "@/types";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { useRef, useState } from "react";
import { get } from "@/utils";
import SearchResult from "./SearchResult";

const WAIT_BEFORE_FETCH = 150;
export default function SearchInput<T>({ onSelect, type }: {
    onSelect: (item: T) => void;
    type: 'artist' | 'track';
}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<(SpotifyArtist | SpotifyTrack)[]>([]);
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const abortContoller = useRef<AbortController | null>(null);

    const search = (query: string) => {
        if(!query) return setResults([]);
        setLoading(true);

        if(timeout.current) {
            clearTimeout(timeout.current);
            timeout.current = null;
        }
        if(abortContoller.current) {
            abortContoller.current.abort();
            abortContoller.current = null;
        }

        timeout.current = setTimeout(() => {
            abortContoller.current = new AbortController();
            get<(SpotifyArtist | SpotifyTrack)[]>(`/search?q=${query}&type=${type}`, abortContoller.current.signal).then(results => {
                setLoading(false);
                setResults(results);
                timeout.current = null;
                abortContoller.current = null;
            });
        }, WAIT_BEFORE_FETCH);
    }

    return(
        <div className="relative max-w-full">
            <Input
                containerClassName={'w-[400px] max-w-full'}
                icon={<SearchIcon className="w-5 text-secondary" />}
                placeholder={'Search artist or song...'}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                onChange={search}
            />
            <AnimatePresence>
                {open && (
                    <motion.ul 
                        exit={{ scale: .98, opacity: 0 }}
                        initial={{ scale: .98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: .15, bounce: false }}
                        className="max-h-[220px] overflow-auto scrollbar absolute z-10 top-[calc(100%+.5rem)] w-full p-2 pr-0 rounded-lg border-[1px] border-tertiary bg-secondary"
                    >
                        {!results.length && (
                            <span className="block text-xs text-secondary">
                                {!loading ? (
                                    `Enter the name of your favorite ${type}`
                                ) : (
                                    'Loading results...'
                                )}
                            </span>
                        )}
                        {results.map(item => {
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