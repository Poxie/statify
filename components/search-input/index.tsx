import { useRef, useState } from "react";
import SearchResult from "./SearchResult";
import CustomSearchInput from "../custom-search-input";
import Input from "../input";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { twMerge } from "tailwind-merge";
import useSearchResults from "@/hooks/useSearchResults";
import SearchResults from "../search-results";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "@/hooks/useClickOutside";

const WAIT_BEFORE_FETCH = 150;
export default function SearchInput<T>({ onSelect, type, placeholder, iconClassName, iconContainerClassName, containerClassName, inputClassName }: {
    onSelect: (item: T) => void;
    type: 'artist' | 'track';
    placeholder: string;
    containerClassName?: string;
    iconClassName?: string;
    iconContainerClassName?: string;
    inputClassName?: string;
}) {
    const [query, setQuery] = useState('');
    const [showResults, setShowResults] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    useClickOutside({
        onClickOutside: () => setShowResults(false),
        ref: containerRef,
    })

    const handleSelect = (item: T) => {
        onSelect(item);
        setShowResults(false);
    }

    const path = query ? `/search?type=${type}&q=${query}` : null;
    const { data, loading, error } = useSearchResults<T>({ path });
    return(
        <div 
            className="relative" 
            ref={containerRef}
        >
            <Input 
                onChange={setQuery}
                defaultValue={query}
                placeholder={placeholder}
                icon={<SearchIcon className={twMerge("w-5 text-secondary", iconClassName)} />}
                onFocus={() => setShowResults(true)}
                className={inputClassName}
                containerClassName={containerClassName}
                iconContainerClassName={iconContainerClassName}
            />
            <AnimatePresence>
                {showResults && (
                    <motion.div
                        initial={{ scale: .98, opacity: 0 }}
                        exit={{ scale: .98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: .15, bounce: false }}
                        className="relative z-10"
                    >
                        <SearchResults<T> 
                            data={data}
                            renderItem={type}
                            onSelect={handleSelect}
                            loading={loading}
                            hasQuery={!!query}
                            beginMessage={`Search for your favorite ${type}...`}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}