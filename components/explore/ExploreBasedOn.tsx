import { AnimatePresence, motion } from "framer-motion";
import ExploreChip from "./ExploreChip";
import { SpotifyArtist, SpotifyTrack } from "@/types";

export default function ExploreBasedOn({ items, setTracks, setArtists }: {
    items: (SpotifyArtist | SpotifyTrack)[];
    setTracks: React.Dispatch<React.SetStateAction<SpotifyTrack[]>>;
    setArtists: React.Dispatch<React.SetStateAction<SpotifyArtist[]>>;
}) {
    return(
        <div className="pt-8 bg-primary sticky -top-4 z-[1] rounded-b-lg">
            <AnimatePresence mode='wait'>
                {items.length === 0 && (
                    <motion.span
                        className="block w-full text-xs text-secondary text-center"
                        exit={{ opacity: 0, translateY: 25 }}
                        initial={{ opacity: 0, translateY: 25 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ bounce: false, duration: .5 }}
                        key={'no-selection'}
                    >
                        Select an artist, a song, or a genre to view recommendations.
                    </motion.span>
                )}
                {items.length !== 0 && (
                    <motion.div 
                        className="mb-4 p-4 rounded-lg bg-secondary overflow-hidden"
                        exit={{ opacity: 0, translateY: 25 }}
                        initial={{ opacity: 0, translateY: 25 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ bounce: false, duration: .5 }}
                        key={'based-on-container'}
                    >
                        <span className="mb-2 block text-xs font-semibold">
                            Here are some songs we recommend based on...
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                            <AnimatePresence>
                                {items.map(item => {
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
                                        <motion.div
                                            className="p-2 grid overflow-hidden bg-tertiary rounded-md whitespace-nowrap"
                                            // Margin calulation is based on container gap and item padding.
                                            exit={{ gridTemplateColumns: '0fr', paddingLeft: 0, paddingRight: 0, marginRight: 'calc(-1 * 0.375rem)' }}
                                            initial={{ gridTemplateColumns: '0fr', paddingLeft: 0, paddingRight: 0, marginRight: 'calc(-1 * 0.375rem)' }}
                                            animate={{ gridTemplateColumns: '1fr', paddingLeft: '0.5rem', paddingRight: '0.5rem', marginRight: 0 }}
                                            transition={{ bounce: false, duration: .5 }}
                                            key={item.id}
                                        >
                                            <ExploreChip 
                                                id={item.id}
                                                text={item.name}
                                                image={image}
                                                onRemove={onItemRemove}
                                                className="min-w-0 p-0"
                                            />
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}