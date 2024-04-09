import { SpotifyTimeRange } from "@/types";
import ProfileTimeRange from "./ProfileTimeRange";
import { HasTooltip } from "@/contexts/tooltip/HasTooltip";
import { QuestionIcon } from "@/assets/icons/QuestionIcon";
import { twMerge } from "tailwind-merge";

export default function ProfileSectionHeader({ header, timeRange, setTimeRange, tooltip, className }: {
    header: string;
    timeRange: SpotifyTimeRange;
    setTimeRange: (timeRange: SpotifyTimeRange) => void;
    tooltip?: string;
    className?: string;
}) {
    return(
        <div className={twMerge(
            "flex justify-between items-center flex-wrap gap-1",
            className,
        )}>
            <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-medium">
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