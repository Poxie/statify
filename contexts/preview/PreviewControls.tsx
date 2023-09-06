import { ForwardIcon } from "@/assets/icons/ForwardIcon";
import { PauseIcon } from "@/assets/icons/PauseIcon";
import { RewindIcon } from "@/assets/icons/RewindIcon";
import { usePreview } from ".";
import { PlayIcon } from "@/assets/icons/PlayIcon";
import { usePreviewPause } from "@/hooks/usePreviewPause";
import { usePreviewSkips } from "@/hooks/usePreviewSkips";

export default function PreviewControls() {
    const { audio } = usePreview();
    const { rewind, forward } = usePreviewSkips();
    const { paused, togglePause } = usePreviewPause();

    return(
        <div className="flex items-center justify-center gap-4">
            <button 
                onClick={rewind}
                aria-label={'Rewind song'}
            >
                <RewindIcon className="w-6" />
            </button>
            <button 
                onClick={togglePause}
                aria-label={paused ? 'Resume song' : 'Pause song'}
            >
                {paused ? (
                    <PlayIcon className="w-8" />
                ) : (
                    <PauseIcon className="w-8" />
                )}
            </button>
            <button 
                onClick={forward}
                aria-label={'Skip song'}
            >
                <ForwardIcon className="w-6" />
            </button>
        </div>
    )
}