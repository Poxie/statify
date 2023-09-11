import Input from "../input";
import { AnimatePresence, motion } from 'framer-motion';
import { SpotifyArtist, SpotifyTrack } from "@/types";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { useState } from "react";
import SearchResult from "./SearchResult";
import { useSearch } from "@/hooks/useSearch";

const WAIT_BEFORE_FETCH = 150;
export default function SearchInput<T>({ onSelect, type }: {
    onSelect: (item: T) => void;
    type: 'artist' | 'track';
}) {
    const [open, setOpen] = useState(false);
    
    const { query, setQuery, loading, results } = useSearch<SpotifyArtist | SpotifyTrack>('artist');

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
                        {!results.length && (
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
                        {results.map(item => {
                            let image: string | undefined;
                            let extraText = '';

                            if(type === 'artist') {
                                image = (item as SpotifyArtist).images.at(-1)?.url;
                                extraText = `${(item as SpotifyArtist).followers.total.toLocaleString()} followers`;
                            } else if(type === 'track') {
                                image = (item as SpotifyTrack).album.images.at(-1)?.url;
                                extraText = `with ${(item as SpotifyTrack).artists[0].name}`;
                            }

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