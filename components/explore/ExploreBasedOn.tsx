import { AnimatePresence, motion } from "framer-motion";
import ExploreChip from "./ExploreChip";
import { SpotifyArtist, SpotifyTrack } from "@/types";
import { twMerge } from "tailwind-merge";

const EMPTY_OFFSET = 20;
export default function ExploreBasedOn({ items, setTracks, setGenres, setArtists }: {
    items: (SpotifyArtist | SpotifyTrack | string)[];
    setGenres: React.Dispatch<React.SetStateAction<string[]>>;
    setTracks: React.Dispatch<React.SetStateAction<SpotifyTrack[]>>;
    setArtists: React.Dispatch<React.SetStateAction<SpotifyArtist[]>>;
}) {
    const empty = items.length === 0;
    return(
        <div className="pt-8 bg-primary sticky -top-4 z-[1] rounded-b-lg">
            <div className={twMerge(
                "mb-3 p-3 rounded-lg overflow-hidden border-[1px] border-transparent transition-colors",
                !empty && 'bg-secondary border-tertiary',
            )}>
                <AnimatePresence mode="wait">
                    {empty && (
                        <motion.span 
                            className="p-2 block text-center text-xs text-secondary"
                            initial={{ opacity: 0, translateY: 20 - EMPTY_OFFSET }}
                            animate={{ opacity: 1, translateY: 0 - EMPTY_OFFSET }}
                            exit={{ opacity: 0, translateY: 20 - EMPTY_OFFSET }}
                            key={'empty'}
                        >
                            Select an artist, a track, or a genre to get started.
                        </motion.span>
                    )}
                    {!empty && (
                        <motion.div 
                            className="flex flex-wrap gap-1.5"
                            initial={{ opacity: 0, translateY: 10 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            exit={{ opacity: 0, translateY: 10 }}
                            key={'items'}
                        >
                            {items.map(item => {
                                if(typeof item === 'string') {
                                    return(
                                        <ExploreChip 
                                            onRemove={() => setGenres(prev => prev.filter(g => g !== item))}
                                            text={item}
                                            id={item}
                                            key={item}
                                        />
                                    )
                                }

                                let image: undefined | string;
                                let onItemRemove: (() => void) | undefined;

                                if('images' in item) {
                                    image = item.images.at(-1)?.url;
                                    onItemRemove = () => setArtists(prev => prev.filter(a => a.id !== item.id));
                                }
                                if('album' in item) {
                                    image = item.album.images.at(-1)?.url;
                                    onItemRemove = () => setTracks(prev => prev.filter(t => t.id !== item.id));
                                }

                                return(
                                    <ExploreChip 
                                        id={item.id}
                                        text={item.name}
                                        image={image}
                                        onRemove={onItemRemove}
                                        key={item.id}
                                    />
                                )
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}