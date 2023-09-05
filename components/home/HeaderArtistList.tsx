"use client";
import { SpotifyArtist } from "@/types"
import HeaderArtist from "./HeaderArtist";
import { HeaderArtistItem } from "./HeaderArtists";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";
import clsx from "clsx";
export default function HeaderArtistList({ artists, positions }: {
    artists: SpotifyArtist[];
    positions: HeaderArtistItem[];
}) {
    const isSmallScreen = useIsSmallScreen();

    return(
        <div className={clsx(
            "pointer-events-none flex items-end justify-between gap-2 absolute",
            isSmallScreen ? 'left-2/4 -translate-x-2/4 w-[90%] sm:w-[80%] h-[calc(100%-100px)]' : 'w-full h-full overflow-hidden',
        )}>
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