import { ForwardIcon } from "@/assets/icons/ForwardIcon";
import { PauseIcon } from "@/assets/icons/PauseIcon";
import { RewindIcon } from "@/assets/icons/RewindIcon";
import { PlayIcon } from "@/assets/icons/PlayIcon";
import { usePreviewPause } from "@/hooks/usePreviewPause";
import { usePreviewSkips } from "@/hooks/usePreviewSkips";
import { HasTooltip } from "../tooltip/HasTooltip";

export default function PreviewControls() {
    const { rewind, forward } = usePreviewSkips();
    const { paused, togglePause } = usePreviewPause();

    return(
        <div className="flex items-center justify-center gap-4">
            <HasTooltip
                onClick={rewind}
                tooltip={'Replay song'}
            >
                <RewindIcon className="w-6" />
            </HasTooltip>
            <HasTooltip
                onClick={togglePause}
                tooltip={paused ? 'Resume song' : 'Pause song'}
            >
                {paused ? (
                    <PlayIcon className="w-8" />
                ) : (
                    <PauseIcon className="w-8" />
                )}
            </HasTooltip>
            <HasTooltip
                onClick={forward}
                tooltip={'Skip song'}
            >
                <ForwardIcon className="w-6" />
            </HasTooltip>
        </div>
    )
}