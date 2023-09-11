import clsx from "clsx";
import { ArrowIcon } from "@/assets/icons/ArrowIcon";
import { usePreview } from ".";
import { HasTooltip } from "../tooltip/HasTooltip";

export default function PreviewExpander() {
    const { expanded, setExpanded } = usePreview();
    return(
        <HasTooltip
            onClick={() => setExpanded(!expanded)}
            tooltip={expanded ? 'Hide history' : 'Show history'}
            hideOnSmallScreens
        >
            <ArrowIcon 
                className={clsx(
                    "w-5 transition-transform",
                    expanded && 'rotate-180'
                )}
            />
        </HasTooltip>
    )
}