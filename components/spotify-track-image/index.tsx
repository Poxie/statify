"use client";
import SpotifyImage, { SpotifyImageProps } from "../spotify-image";
import { usePreview } from "@/contexts/preview";
import { SpotifyTrack } from "@/types";
import { PlayIcon } from "@/assets/icons/PlayIcon";
import { PauseIcon } from "@/assets/icons/PauseIcon";
import { usePreviewPause } from "@/hooks/usePreviewPause";
import clsx from "clsx";
import { HasTooltip } from "@/contexts/tooltip/HasTooltip";
import { twMerge } from "tailwind-merge";

export default function SpotifyTrackImage(props: Omit<SpotifyImageProps, 'className'> & {
    track: SpotifyTrack;
    containerClassName?: string;
    imageClassName?: string;
    buttonClassName?: string;
}) {
    const { track, containerClassName, imageClassName, buttonClassName } = props;

    const { addTrack, track: previewTrack } = usePreview();
    const { paused, togglePause } = usePreviewPause();

    const handleClick = () => {
        if(!canBePreviewed) return;
        
        if(previewTrack?.id !== track.id) {
            addTrack(track);
            return;
        }
        togglePause();
    }

    const canBePreviewed = track.preview_url !== null;
    const isPreviewTrack = previewTrack?.id === track.id;
    const isPausable = isPreviewTrack && !paused;
    return(
        <div className={twMerge(
            "relative",
            containerClassName,
        )}>
            <SpotifyImage 
                {...props}
                className={imageClassName}
            />
            <button 
                disabled={!canBePreviewed}
                onClick={handleClick}
                aria-label={isPausable ? canBePreviewed ? `Play preview for ${track.name}` : `Preview for ${track.name} is not available` : `Pause preview for ${track.name}`}
                className={clsx(
                    "absolute w-full h-full left-0 top-0 flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 duration-300 transition-[opacity,background-color]",
                    !canBePreviewed && "before:pointer-events-none before:absolute before:w-1 before:h-8 before:rotate-45 before:top-2/4 before:left-2/4 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-lg before:bg-tertiary before:z-[5]",
                    !buttonClassName?.includes('bg-') && "bg-tertiary bg-opacity-75",
                    isPreviewTrack && 'opacity-100',
                    buttonClassName,
                )}
            >
                {!canBePreviewed ? (
                    <HasTooltip 
                        tooltip="This song is not available for preview."
                        delay={250}
                    >
                        <ButtonIcon isPausable={isPausable} />
                    </HasTooltip>
                ) : (
                    <ButtonIcon isPausable={isPausable} />
                )}
            </button>
        </div>
    )
}

function ButtonIcon({ isPausable }: {
    isPausable: boolean;
}) {
    return(
        isPausable ? (
            <PauseIcon className="w-7 relative z-[4]" />
        ) : (
            <PlayIcon className="w-7 relative z-[4]" />
        )
    )
}