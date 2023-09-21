import clsx from "clsx";
import { SpotifyTrackWithColor } from "@/types";
import TopListTrack from "../top-lists/TopListTrack";
import { AnimatePresence, motion } from "framer-motion";

const TRACKS_PER_FETCH = 20;
export default function ExploreTracks({ tracks, loading }: {
    tracks: SpotifyTrackWithColor[];
    loading: boolean;
}) {
    return(
        <>
        <AnimatePresence>
            {tracks.length !== 0 && (
                <motion.div 
                    className={clsx(
                        "grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5",
                        loading && 'pointer-events-none'
                    )}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, translateY: 25 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: .5, bounce: false }}
                >
                    {tracks.map((track, index) => (
                        <TopListTrack
                            index={index % TRACKS_PER_FETCH}
                            track={track}
                            loading={loading}
                            showIndex={false}
                            small
                            key={index}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
        {(!loading && tracks.length !== 0) && (
            <span className="block w-full text-sm py-4 text-secondary text-center">
                Loading more recommendations...
            </span>
        )}
        </>
    )
}