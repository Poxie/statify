
import useSearchResults from "@/hooks/useSearchResults";
import Input from "../input";
import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SearchResults from "../search-results";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { twMerge } from "tailwind-merge";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function ListInput({ path, placeholder, onSelect, iconClassName, iconContainerClassName, inputClassName, containerClassName }: {
    path: string;
    placeholder: string;
    onSelect: (item: string) => void;
    containerClassName?: string;
    iconClassName?: string;
    iconContainerClassName?: string;
    inputClassName?: string;
}) {
    const { data, loading } = useSearchResults<string>({ path });

    const [search, setSearch] = useState('');
    const [showResults, setShowResults] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    useClickOutside({
        onClickOutside: () => setShowResults(false),
        ref: containerRef,
    })
    
    const handleSelect = (item: string) => {
        onSelect(item);
        setShowResults(false);
    }
    
    const filteredData = data?.filter(item => item.toLowerCase().includes(search.toLowerCase()));
    return(
        <div className="relative" ref={containerRef}>
            <Input 
                onChange={setSearch}
                placeholder={placeholder}
                className={inputClassName}
                containerClassName={containerClassName}
                iconContainerClassName={iconContainerClassName}
                icon={<SearchIcon className={twMerge("w-5 text-secondary", iconClassName)} />}
                onFocus={() => setShowResults(true)}
            />
            <AnimatePresence>
                {showResults && (
                    <SearchResults<string>
                        data={filteredData}
                        hasQuery={true}
                        loading={loading}
                        onSelect={handleSelect}
                        renderItem="list"
                    />
                )}
            </AnimatePresence>
        </div>
    )
}