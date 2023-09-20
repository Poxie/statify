import { SpotifyArtist, SpotifyTrack } from "@/types";
import SearchInput from "../search-input";
import ExploreChip from "./ExploreChip";

export default function ExploreInput<T>({ items, type, onItemAdd, onItemRemove }: {
    type: 'artist' | 'track';
    onItemAdd: (item: T) => void;
    onItemRemove: (itemId: string) => void;
    items: (SpotifyTrack | SpotifyArtist)[];
}) {
    const onSelect = (item: SpotifyArtist | SpotifyTrack) => {
        const prevItem = items.find(i => i.id === item.id);

        if(prevItem) return onItemRemove(item.id);
        onItemAdd(item as T);
    }

    return(
        <div className="p-3 pb-0 flex flex-col bg-secondary rounded-md">
            <SearchInput 
                inputClassName="py-2.5 pr-2.5 text-sm"
                iconContainerClassName="p-2.5"
                iconClassName="w-4"
                onSelect={onSelect}
                type={type}
            />
            <div className="pt-2 pb-4 flex-1 flex items-center justify-center">
                <div className="min-h-[52px] h-full p-2 flex-1 flex items-start flex-wrap gap-1 bg-primary rounded-lg">
                    {items.length !== 0 && (
                        items.map(item => {
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