import { SpotifyArtist } from "@/types";
import Artist from "../artist";
import clsx from "clsx";
import Link from "next/link";
import { useAnimateStyle } from "@/hooks/useAnimateStyle";
import { useRef } from "react";

export default function HomeArtistInfo({ isPopular, artist, loading }: {
    isPopular: boolean;
    artist: SpotifyArtist | undefined;
    loading: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useAnimateStyle(ref, loading, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
    })
    return(
        <div className={clsx(
            "w-[800px] max-w-[90%] mx-auto absolute left-2/4 -translate-x-2/4 -translate-y-full flex rounded-t-lg sm:max-w-[80%]",
            isPopular ? 'gradient-border [--border-bottom:0px] [--border-left:1px] [--border-right:1px]' : 'border-[1px] border-b-0 border-tertiary',
        )}>
            <div className={clsx(
                "w-4 aspect-square absolute bottom-0 right-full rounded-br-lg",
                "before:absolute before:bg-secondary before:w-full before:aspect-square before:-z-[1]",
                "after:absolute after:bg-primary after:w-full after:aspect-square after:rounded-br-lg after:right-[1px] after:bottom-[1px]",
                isPopular ? 'bg-[var(--gradient-from)]' : 'bg-tertiary',
            )} />
            <div className="flex-1 bg-secondary rounded-t-[.45rem]">
                <div 
                    className="p-4 flex-1 flex flex-col gap-2 items-start justify-between sm:flex-row"
                    ref={ref}
                >
                    <Artist
                        artist={artist}
                        hasPopularityExplanation
                        isPopular={isPopular}
                    />
                    {artist && (
                        <Link
                            target="_blank" 
                            href={artist.external_urls.spotify}
                            className="text-xs text-secondary hover:text-primary transition-colors"
                        >
                            Follow {artist.name}
                        </Link>
                    )}
                </div>
            </div>
            <div className={clsx(
                "w-4 aspect-square absolute bottom-0 left-full rounded-bl-lg",
                "before:absolute before:bg-secondary before:w-full before:aspect-square before:-z-[1]",
                "after:absolute after:bg-primary after:w-full after:aspect-square after:rounded-bl-lg after:left-[1px] after:bottom-[1px]",
                isPopular ? 'bg-[var(--gradient-to)]' : 'bg-tertiary',
            )} />
        </div>
    )
}