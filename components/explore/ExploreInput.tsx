import { useState } from "react";
import { SpotifyArtist, SpotifyTrack } from "@/types";
import SearchInput from "../search-input";
import ListInput from "../list-input";
import ExploreChip from "./ExploreChip";

export default function ExploreInput<T>({ items, type, onItemAdd, onItemRemove }: {
    type: 'artist' | 'track' | 'genre';
    onItemAdd: (item: T) => void;
    onItemRemove: (itemId: string) => void;
    items: (SpotifyTrack | SpotifyArtist | string)[];
}) {
    const [search, setSearch] = useState('');

    const onSelect = (item: SpotifyArtist | SpotifyTrack | string) => {
        // Handling genres
        if(typeof item === 'string') {
            const prevItem = items.find(i => i === item);
            if(prevItem) return onItemRemove(item);
            return onItemAdd(item as T);
        }

        // Handling artists and tracks
        const prevItem = items.find(i => {
            if(typeof i === 'string') return;
            return i.id === item.id;
        });
        if(prevItem) return onItemRemove(item.id);
        onItemAdd(item as T);
    }

    return(
        <div className="p-3 pb-0 flex flex-col bg-secondary rounded-md">
            {type !== 'genre' ? (
                <SearchInput 
                    type={type}
                    onSelect={onSelect}
                    placeholder={`Search ${type}...`}
                    inputClassName="py-2.5 pr-2.5 text-sm"
                    iconContainerClassName="p-2.5"
                    iconClassName="w-4"
                />
            ) : (
                <ListInput
                    path={'/genre/list'}
                    placeholder={`Search ${type}...`}
                    inputClassName="py-2.5 pr-2.5 text-sm"
                    iconContainerClassName="p-2.5"
                    iconClassName="w-4"
                    onSelect={onSelect}
                />
            )}
            <div className="pt-2 pb-4 flex-1 flex items-center justify-center">
                <div className="min-h-[52px] h-full p-2 flex-1 flex items-center flex-wrap gap-1 bg-primary rounded-lg">
                    {items.length !== 0 && (
                        items.map(item => {
                            if(typeof item === 'string') {
                                return(
                                    <ExploreChip 
                                        id={item}
                                        text={item}
                                        onRemove={() => onItemRemove(item)}
                                        key={item}
                                    />
                                )
                            }
                            
                            let text = item.name;
                            let image: string | undefined;

                            if('images' in item) image = item.images.at(-1)?.url;
                            if('album' in item) image = item.album.images.at(-1)?.url;

                            return(
                                <ExploreChip 
                                    id={item.id}
                                    text={text}
                                    image={image}
                                    onRemove={() => onItemRemove(item.id)}
                                    key={item.id}
                                />
                            )
                        })
                    )}
                    {items.length === 0 && (
                        <span className="block self-center w-full text-xs text-center text-secondary">
                            Select {type === 'artist' ? 'an' : 'a'} {type} to get recommendations based on.
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}