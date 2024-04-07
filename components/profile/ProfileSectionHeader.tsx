import { SpotifyTimeRange } from "@/types";
import ProfileTimeRange from "./ProfileTimeRange";
import { HasTooltip } from "@/contexts/tooltip/HasTooltip";
import { QuestionIcon } from "@/assets/icons/QuestionIcon";

export default function ProfileSectionHeader({ header, timeRange, setTimeRange, tooltip }: {
    header: string;
    timeRange: SpotifyTimeRange;
    setTimeRange: (timeRange: SpotifyTimeRange) => void;
    tooltip?: string;
}) {
    return(
        <div className="flex justify-between items-center">
            <h2 className="mb-3 flex items-center gap-3 text-2xl md:text-3xl font-medium">
                {header}
                {tooltip && (
                    <HasTooltip 
                        delay={250}
                        tooltip={tooltip}
                    >
                        <QuestionIcon className="mt-1.5 w-4 text-secondary" />
                    </HasTooltip>
                )}
            </h2>
            <ProfileTimeRange 
                timeRange={timeRange}
                setTimeRange={setTimeRange}
            />
        </div>
    )
}