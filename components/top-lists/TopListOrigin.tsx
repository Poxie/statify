import { useAnimateStyle } from "@/hooks/useAnimateStyle";
import { ToplistInfo } from "@/hooks/useCountryTopList";
import Link from "next/link";
import { useRef } from "react";

const TRACK_COUNT = 15;
const TRACK_DELAY = 100;
export default function TopListOrigin({ playlistInfo }: {
    playlistInfo: ToplistInfo['playlistInfo'] | undefined;
}) {
    const ref = useRef<HTMLSpanElement>(null);

    useAnimateStyle(ref, !playlistInfo, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delayIn: (TRACK_COUNT + 1) * TRACK_DELAY,
    })
    return(
        <span 
            className="block mt-3 text-xs text-secondary text-right"
            ref={ref}
        >
            {playlistInfo && (
                <>
                Based on{' '}
                <Link 
                    className="transition-colors hover:text-primary"
                    href={playlistInfo.href}
                    target="_blank"
                >
                    {playlistInfo.name}
                </Link>
                {' '} by{' '}
                <Link 
                    className="transition-colors hover:text-primary"
                    href={playlistInfo.owner.external_urls.spotify}
                    target="_blank"
                >
                    {playlistInfo.owner.display_name}
                </Link>
                </>
            )}
        </span>
    )
}