import Track from "../track";
import ItemContainer from "../item-container";
import { useRef } from "react";
import { SpotifyArtist, SpotifyTrack } from "@/types";
import { useAnimateStyle } from "@/hooks/useAnimateStyle";
import { HasTooltip } from "@/contexts/tooltip/HasTooltip";
import { QuestionIcon } from "@/assets/icons/QuestionIcon";
import Link from "next/link";

const RELATED_TRACK_COUNT = 48;
export default function HomeRelatedTracks({ artist, relatedTracks, loading }: {
    artist: SpotifyArtist | undefined;
    relatedTracks: SpotifyTrack[] | undefined;
    loading: boolean;
}) {
    const container = useRef<HTMLDivElement>(null);

    useAnimateStyle(container, loading, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delayIn: 700,
    })
    return(
        <ItemContainer
            className="pr-0"
            title={relatedTracks ? `If you like ${artist?.name}'s songs you may also like...` : ''}
            emptyLabel={'This artist does not have enough data to show similar songs.'}
            isEmpty={!relatedTracks?.length}
            loading={loading}
            ref={container}
        >
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 max-h-[350px] overflow-auto scrollbar pb-4 pr-4">
                {(relatedTracks || Array.from(Array(RELATED_TRACK_COUNT))).slice(0, RELATED_TRACK_COUNT).map((track, key) => (
                    <Track 
                        track={track}
                        key={key}
                    />
                ))}
            </div>
            {relatedTracks ? (
                <div className="flex justify-between flex-wrap gap-3 text-xs text-secondary pt-4 mr-4 border-t-[1px] border-t-tertiary">
                    <div className="flex sm:items-center gap-2">
                        <span>
                            Navigate to our
                            {' '}
                            <Link
                                href={`/explore`}
                                className="transition-colors hover:text-primary"
                            >
                                exploration section
                            </Link>
                            {' '}
                            for more advanced search options.
                        </span>
                        <HasTooltip 
                            tooltip={'These recommendations are based only on the artist and its top four genres. Visit our exploration section for better recommendations.'}
                        >
                            <QuestionIcon className="w-3" />
                        </HasTooltip>
                    </div>
                    <Link 
                        href={'/explore'}
                        className="transition-colors hover:text-primary"
                    >
                        Explore more
                    </Link>
                </div>
            ) : (
                <div className="h-[33px]">

                </div>
            )}
        </ItemContainer>
    )
}