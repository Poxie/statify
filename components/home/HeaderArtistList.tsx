"use client";
import { SpotifyArtist } from "@/types"
import HeaderArtist from "./HeaderArtist";
import { useScreenSize } from "@/hooks/useScreenSize";

export default function HeaderArtistList({ artists, positions }: {
    artists: SpotifyArtist[];
    positions: {top: string, left?: string, right?: string}[];
}) {
    const screenSize = useScreenSize();
    const isSmallDevice = ['xs', 'sm'].includes(screenSize);
    const isVerySmall = screenSize === 'xs';

    return(
        <div className={`flex items-end justify-between gap-2 absolute ${isSmallDevice ? 'left-2/4 -translate-x-2/4 w-[90%] sm:w-[80%] ' + (isVerySmall ? 'h-[calc(100%-38px)]' : 'h-[calc(100%-16px)]') : 'w-full h-full overflow-hidden'} pointer-events-none`}>
            {artists.map((artist, key) => (
                <HeaderArtist 
                    {...artist}
                    {...positions[key]}
                    key={artist.id}
                />
            ))}
        </div>
    )
}