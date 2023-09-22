import Input from '../input';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { useClickOutside } from "@/hooks/useClickOutside";
import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { get } from '@/utils';

export default function CustomSearchInput({ path, placeholder, onSelect, containerClassName, inputClassName, iconClassName, iconContainerClassName }: {
    path: string;
    placeholder: string;
    onSelect: (item: string) => void;
    containerClassName?: string;
    inputClassName?: string;
    iconClassName?: string;
    iconContainerClassName?: string;
}) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const resultsContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!open || results.length) return;

        const abortController = new AbortController();
        get<string[]>(path, abortController.signal)
            .then(results => {
                setLoading(false);
                setResults(results);
            })

        return () => abortController.abort();
    }, [path, open, results.length]);

    const onClickOutside = useCallback(() => setOpen(false), [setOpen]);
    useClickOutside({
        ref: inputRef,
        allowedRef: resultsContainer,
        onClickOutside,
    })

    const filteredGenres = useMemo(() => (
        results.filter(item => item.toLowerCase().includes(query.toLowerCase()))
    ), [results, query])
    return(
        <div className="relative max-w-full">
            <Input
                className={inputClassName}
                iconContainerClassName={iconContainerClassName}
                containerClassName={containerClassName}
                icon={
                    <SearchIcon className={twMerge(
                        "w-5 text-secondary",
                        iconClassName,
                    )} />
                }
                placeholder={placeholder}
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
                            {!filteredGenres.length && (
                                <span className="block text-xs text-secondary">
                                    {!loading ? (
                                        'No results were found.'
                                    ) : (
                                        'Loading results...'
                                    )}
                                </span>
                            )}
                            {filteredGenres.map(item => {
                                return(
                                    <li key={item}>
                                        <button 
                                            className="px-2 py-1.5 w-full text-sm text-left rounded-md transition-colors hover:bg-tertiary"
                                            onClick={() => {
                                                onSelect(item);
                                                setOpen(false);
                                            }}
                                        >
                                            {item}
                                        </button>
                                    </li>
                                )
                            })}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}