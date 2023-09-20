import { SpotifyTrackWithColor } from "@/types";
import clsx from "clsx";
import TopListTrack from "../top-lists/TopListTrack";

const TRACKS_PER_FETCH = 20;
export default function ExploreTracks({ tracks, loading }: {
    tracks: SpotifyTrackWithColor[];
    loading: boolean;
}) {
    return(
        <>
        <div className={clsx(
            "grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5",
            loading && 'pointer-events-none'
        )}>
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
        </div>
        {tracks.length !== 0 && (
            <span className="block w-full text-sm py-4 text-secondary text-center">
                Loading more recommendations...
            </span>
        )}
        </>
    )
}