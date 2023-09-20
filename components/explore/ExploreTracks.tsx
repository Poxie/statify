import { SpotifyTrackWithColor } from "@/types";
import clsx from "clsx";
import TopListTrack from "../top-lists/TopListTrack";

export default function ExploreTracks({ tracks, loading }: {
    tracks: SpotifyTrackWithColor[];
    loading: boolean;
}) {
    return(
        <div className={clsx(
            "grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5",
            loading && 'pointer-events-none'
        )}>
            {tracks.map((track, index) => (
                <TopListTrack
                    index={index}
                    track={track}
                    loading={loading}
                    showIndex={false}
                    small
                    key={track.id}
                />
            ))}
        </div>
    )
}