import { usePreview } from "@/contexts/preview";
import { SpotifyTrack } from "@/types";
import clsx from "clsx";

export default function SpotifyTrackName({ track, className }: {
    track: SpotifyTrack;
    className?: string;
}) {
    const { setTrack } = usePreview();
    
    return(
        <button 
            onClick={() => setTrack(track)}
            className={clsx(
                "text-left",
                className
            )}
        >
            {track.name}
        </button>
    )
}