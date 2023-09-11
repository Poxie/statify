import ItemContainer from "../item-container";
import Artist from "../artist";
import { useRef } from "react";
import { SpotifyArtist } from "@/types";
import { POPULARITY_THRESHOLD } from "@/utils/constants";
import { useAnimateStyle } from "@/hooks/useAnimateStyle";

const RELATED_ARTIST_COUNT = 12;
export default function HomeRelatedArtists({ artist, relatedArtists, loading }: {
    artist: SpotifyArtist | undefined;
    relatedArtists: SpotifyArtist[] | undefined;
    loading: boolean;
}) {
    const container = useRef<HTMLDivElement>(null);

    useAnimateStyle(container, loading, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delayIn: 500,
    })
    return(
        <ItemContainer
            className="pb-0 pr-0"
            title={artist ? `Artists related to ${artist?.name}` : undefined}
            emptyLabel={'This artist does not have enough data to show related artists.'}
            isEmpty={!relatedArtists?.length}
            loading={!relatedArtists}
            ref={container}
        >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-h-[350px] overflow-auto scrollbar pb-4 pr-4">
                {(relatedArtists || Array.from(Array(RELATED_ARTIST_COUNT))).slice(0, RELATED_ARTIST_COUNT).map((artist, key) => (
                    <Artist 
                        isPopular={artist?.popularity > POPULARITY_THRESHOLD}
                        artist={artist}
                        small
                        key={key}
                    />
                ))}
            </div>
        </ItemContainer>
    )
}