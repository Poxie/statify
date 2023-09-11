import Input from "../input";
import { AnimatePresence, motion } from 'framer-motion';
import { SpotifyArtist, SpotifyTrack } from "@/types";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { useCallback, useRef, useState } from "react";
import SearchResult from "./SearchResult";
import { useSearch } from "@/hooks/useSearch";
import { useClickOutside } from "@/hooks/useClickOutside";

const WAIT_BEFORE_FETCH = 150;
export default function SearchInput<T>({ onSelect, type }: {
    onSelect: (item: T) => void;
    type: 'artist' | 'track';
}) {
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsContainer = useRef<HTMLDivElement>(null);

    const { query, setQuery, loading, results } = useSearch<SpotifyArtist | SpotifyTrack>('artist');

    const onClickOutside = useCallback(() => setOpen(false), [setOpen]);
    useClickOutside({
        ref: inputRef,
        allowedRef: resultsContainer,
        onClickOutside,
    })

    const handleSelect = (item: typeof results[number]) => {
        setOpen(false);
        onSelect(item as T);
    }
    return(
        <div className="relative max-w-full">
            <Input
                containerClassName={'w-[400px] max-w-full'}
                icon={<SearchIcon className="w-5 text-secondary" />}
                placeholder={'Search artist or song...'}
                onFocus={() => setOpen(true)}
                onChange={setQuery}
                ref={inputRef}
            />
            <div ref={resultsContainer}>
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
                                        onSelect={() => handleSelect(item)}
                                        key={item.id}
                                    />
                                )
                            })}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}