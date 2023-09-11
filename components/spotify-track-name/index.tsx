"use client";
import { usePreview } from "@/contexts/preview";
import { SpotifyTrack } from "@/types";
import clsx from "clsx";

export default function SpotifyTrackName({ track, className }: {
    track: SpotifyTrack;
    className?: string;
}) {
    const { track: currentTrack, setTrack } = usePreview();

    return(
        <button 
            onClick={track.preview_url ? () => setTrack(track) : undefined}
            className={clsx(
                "text-left font-semibold text-ellipsis whitespace-nowrap overflow-hidden transition-colors hover:text-c-primary",
                track.id === currentTrack?.id && 'text-c-primary',
                className
            )}
        >
            {track.name}
        </button>
    )
}