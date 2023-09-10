"use client";
import { PauseIcon } from "@/assets/icons/PauseIcon";
import { PlayIcon } from "@/assets/icons/PlayIcon";
import { usePreview } from "@/contexts/preview";
import { usePreviewPause } from "@/hooks/usePreviewPause";
import { SpotifyTrack } from "@/types";
import { CSSProperties } from "react";

export default function TopListTrackPreview({ track, className, style }: {
    track: SpotifyTrack;
    className?: string;
    style?: CSSProperties;
}) {
    const { setTrack, track: previewTrack } = usePreview();
    const { paused, togglePause } = usePreviewPause();

    const { id, preview_url, name } = track;
    const isPreviewTrack = id === previewTrack?.id;
    return(
        <button
            style={style}
            className={className}
            disabled={!preview_url}
            aria-label={(isPreviewTrack && paused) || !isPreviewTrack ? (
                `Play ${track.name}`
            ) : (
                `Pause ${track.name}`
            )}
            onClick={() => {
                if(isPreviewTrack) return togglePause();
                if(!preview_url) return;
                setTrack(track);
            }}
        >
            {!isPreviewTrack || paused ? (
                <PlayIcon className="w-8 relative z-[4]" />
            ) : (
                <PauseIcon className="w-8 relative z-[4]" />
            )}
        </button>
    )
}