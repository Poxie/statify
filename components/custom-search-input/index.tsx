import Input from '../input';
import { useState, useRef, useCallback } from 'react';
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { useClickOutside } from "@/hooks/useClickOutside";
import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useSearch } from '@/hooks/useSearch';
import { useSortedResults } from '@/hooks/useSortedResults';

export default function CustomSearchInput<T extends string | Record<string, any>>({ RenderItem, path, placeholder, resultsPlaceholder, onSelect, onChange, containerClassName, inputClassName, iconClassName, iconContainerClassName, sortByKey }: {
    RenderItem?: React.ComponentType<any>;
    path: string | undefined;
    placeholder: string;
    resultsPlaceholder?: string;
    onSelect: (item: T) => void;
    onChange?: (query: string) => void;
    containerClassName?: string;
    inputClassName?: string;
    iconClassName?: string;
    iconContainerClassName?: string;
    sortByKey?: string;
}) {
    const [open, setOpen] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const resultsContainer = useRef<HTMLDivElement>(null);

    const { results, loading } = useSearch<T>(path);
    const { setQuery, results: sortedResults } = useSortedResults<T>(results, sortByKey);

    const handleChange = (query: string) => {
        setQuery(query);
        if(onChange) onChange(query);
    }

    const onClickOutside = useCallback(() => setOpen(false), [setOpen]);
    useClickOutside({
        ref: inputRef,
        allowedRef: resultsContainer,
        onClickOutside,
    })
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
                onChange={handleChange}
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
                            {!sortedResults.length && (
                                <span className="block text-xs text-secondary">
                                    {!loading ? (
                                        (!path && resultsPlaceholder) ? (
                                            resultsPlaceholder
                                        ) : (
                                            'No results were found.'
                                        )
                                    ) : (
                                        'Loading results...'
                                    )}
                                </span>
                            )}
                            {sortedResults.map((item, key) => {
                                return(
                                    <li key={key}>
                                        <button 
                                            className="w-full text-sm text-left rounded-md transition-colors hover:bg-tertiary"
                                            onClick={() => {
                                                onSelect(item as T);
                                                setOpen(false);
                                            }}
                                        >
                                            {typeof item === 'string' ? (
                                                <span className="block px-2 py-1.5">
                                                    {item}
                                                </span>
                                            ) : (
                                                RenderItem ? (
                                                    <RenderItem 
                                                        {...item}
                                                    />
                                                ) : (
                                                    <span className="block px-2 py-1.5">
                                                        Render item not specificed.
                                                    </span>
                                                )
                                            )}
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