import { SpotifyTimeRange } from "@/types"
import Dropdown from "../dropdown";

export default function ProfileTimeRange({ timeRange, setTimeRange }: {
    timeRange: SpotifyTimeRange;
    setTimeRange: (timeRange: SpotifyTimeRange) => void;
}) {
    return(
        <Dropdown 
            items={[
                { text: 'Last 4 weeks', id: 'short_term' },
                { text: 'Last 6 months', id: 'medium_term' },
                { text: 'Last 12 months', id: 'long_term' },
            ]}
            currentActiveId={timeRange}
            onSelect={setTimeRange}
        />
    )
}