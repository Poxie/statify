import { usePreview } from "@/contexts/preview";
import SpotifyImage, { SpotifyImageProps } from "../spotify-image";
import { SpotifyTrack } from "@/types";
import { PlayIcon } from "@/assets/icons/PlayIcon";
import { PauseIcon } from "@/assets/icons/PauseIcon";
import { usePreviewPause } from "@/hooks/usePreviewPause";

export default function SpotifyTrackImage(props: SpotifyImageProps & {
    track: SpotifyTrack;
}) {
    const { setTrack, track } = usePreview();
    const { paused, togglePause } = usePreviewPause();
    
    const canBePreviewed = props.track.preview_url !== null;

    const handleClick = () => {
        if(!canBePreviewed) return;
        if(track?.id !== props.track.id) return setTrack(props.track);
        togglePause();
    }

    const isPausable = track?.id === props.track.id && !paused;
    return(
        <div className="relative">
            <SpotifyImage 
                {...props}
            />
            <button 
                onClick={handleClick}
                aria-label={isPausable ? canBePreviewed ? `Play preview for ${track.name}` : `Preview for ${track.name} is not available` : `Pause preview for ${track?.name}`}
                className={`absolute w-full h-full left-0 top-0 flex items-center justify-center bg-secondary bg-opacity-75 opacity-0 group-hover:opacity-100 ${isPausable ? 'opacity-100' : ''} duration-300 transition-opacity ${!canBePreviewed ? 'after:bg-t-secondary after:rounded-full after:h-[1.35rem] after:w-[.18rem] after:rotate-45 after:absolute after:left-[50%+.25rem] after:-translate-x-2/4' : 'focus:opacity-100'}`}
            >
                {isPausable ? (
                    <PauseIcon className="w-7" />
                ) : (
                    <PlayIcon className="w-7" />
                )}
            </button>
        </div>
    )
}