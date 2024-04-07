import { SpotifyTimeRange } from "@/types";
import ProfileTimeRange from "./ProfileTimeRange";

export default function ProfileSectionHeader({ header, timeRange, setTimeRange }: {
    header: string;
    timeRange: SpotifyTimeRange;
    setTimeRange: (timeRange: SpotifyTimeRange) => void;
}) {
    return(
        <div className="flex justify-between items-center">
            <h2 className="mb-3 text-2xl md:text-3xl font-medium">
                {header}
            </h2>
            <ProfileTimeRange 
                timeRange={timeRange}
                setTimeRange={setTimeRange}
            />
        </div>
    )
}