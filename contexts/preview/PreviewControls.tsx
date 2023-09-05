import { ForwardIcon } from "@/assets/icons/ForwardIcon";
import { PauseIcon } from "@/assets/icons/PauseIcon";
import { RewindIcon } from "@/assets/icons/RewindIcon";

export default function PreviewControls() {
    return(
        <div className="flex items-center justify-center gap-4 col-span-3">
            <button>
                <RewindIcon className="w-6" />
            </button>
            <button>
                <PauseIcon className="w-8" />
            </button>
            <button>
                <ForwardIcon className="w-6" />
            </button>
        </div>
    )
}