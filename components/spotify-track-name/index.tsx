"use client";
import { usePreview } from "@/contexts/preview";
import { SpotifyTrack } from "@/types";
import clsx from "clsx";

export default function SpotifyTrackName({ track, className }: {
    track: SpotifyTrack;
    className?: string;
}) {
    const { track: previewTrack, addTrack } = usePreview();

    const canBePreviewed = !!track.preview_url;
    const isPreviewTrack = previewTrack?.id === track.id;

    const handleClick = () => {
        if(isPreviewTrack || !canBePreviewed) return;
        addTrack(track);
    }
    
    return(
        <button 
            disabled={!canBePreviewed}
            onClick={handleClick}
            className={clsx(
                "text-left font-semibold text-ellipsis whitespace-nowrap overflow-hidden transition-colors hover:text-c-primary",
                isPreviewTrack && 'text-c-primary',
                className
            )}
        >
            {track.name}
        </button>
    )
}