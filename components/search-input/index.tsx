import { useState } from "react";
import SearchResult from "./SearchResult";
import CustomSearchInput from "../custom-search-input";

const WAIT_BEFORE_FETCH = 150;
export default function SearchInput<T extends { [prop: string]: T[keyof T] } | string>({ onSelect, type, iconClassName, iconContainerClassName, containerClassName, inputClassName }: {
    onSelect: (item: T) => void;
    type: 'artist' | 'track';
    containerClassName?: string;
    iconClassName?: string;
    iconContainerClassName?: string;
    inputClassName?: string;
}) {
    const [query, setQuery] = useState('');

    const path = `/search?type=${type}&q=${query}`;
    return(
        <CustomSearchInput<T> 
            path={query ? path : undefined}
            onSelect={onSelect}
            onChange={setQuery}
            sortByKey={'name'}
            RenderItem={SearchResult}
            placeholder={`Search ${type}...`}
            resultsPlaceholder={`Search for your favorite ${type}...`}
            iconClassName={iconClassName}
            iconContainerClassName={iconContainerClassName}
            containerClassName={containerClassName}
            inputClassName={inputClassName}
        />
    )
}