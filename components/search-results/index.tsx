import { motion } from "framer-motion";
import ArtistResult from "./ArtistResult";
import TrackResult from "./TrackResult";
import ListResult from "./ListResult";

export type SearchResultItem = 'artist' | 'track' | 'list';
export default function SearchResults<T>({ 
    data, 
    renderItem, 
    onSelect, 
    hasQuery, 
    loading,
    loadingMessage='Loading results...',
    emptyMessage='No results were found.', 
    beginMessage='Start typing to search...',
}: {
    data: T[];
    renderItem: SearchResultItem;
    onSelect: (item: T) => void;
    loading: boolean;
    hasQuery: boolean;
    loadingMessage?: string;
    emptyMessage?: string;
    beginMessage?: string;
}) {
    let RenderItem: React.ComponentType<{ 
        item: any;
        onSelect: (item: any) => void;
    }>;
    switch(renderItem) {
        case 'artist':
            RenderItem = ArtistResult;
            break;
        case 'track':
            RenderItem = TrackResult;
            break;
        case 'list':
            RenderItem = ListResult;
            break;
    }
    if(!RenderItem) throw new Error('Invalid render item');

    return(
        <motion.div 
            initial={{ scale: .98, opacity: 0 }}
            exit={{ scale: .98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: .15, bounce: false }}
            className="p-2 max-h-[220px] w-full z-10 absolute top-[calc(100%+8px)] bg-secondary border-[1px] border-tertiary rounded-md overflow-auto"
        >
            <ul>
                {data.map((item, key) => (
                    <li key={key}>
                        <RenderItem
                            item={item}
                            onSelect={onSelect}
                        />
                    </li>
                ))}
            </ul>
            {data.length === 0 && (
                <span className="block text-xs text-secondary">
                    {loading ? loadingMessage : (
                        hasQuery ? emptyMessage : beginMessage
                    )}
                </span>
            )}
        </motion.div>
    )
}