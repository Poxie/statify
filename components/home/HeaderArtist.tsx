"use client";
import clsx from "clsx";
import Link from "next/link";
import SpotifyImage from "../spotify-image";
import { SpotifyArtist } from "@/types";
import { useRef } from "react";
import { POPULARITY_THRESHOLD } from "@/utils/constants";
import { useActiveArtistId } from "@/hooks/useActiveArtistId";
import { getRandomArtist } from "@/utils";
import { useCombo } from "@/contexts/combo";
import { HeaderArtistItem } from "./HeaderArtists";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";
import { useMouseParallax } from "@/hooks/useMouseParallax";

export default function HeaderArtist({ id, name, popularity, images, top, left, right, parallax }: SpotifyArtist & HeaderArtistItem) {
    const activeArtistId = useActiveArtistId();
    const isSmallScreen = useIsSmallScreen();
    const { increaseCombo, cancelCombo, isPlaying } = useCombo();

    const ref = useRef<HTMLDivElement>(null);
    useMouseParallax(ref, { parallax });

    const isActive = id === activeArtistId;
    const isPopular = popularity > POPULARITY_THRESHOLD;
    return(
        <div 
            className={clsx(
                "aspect-square flex items-center justify-center duration-300 transition-[width]",
                !isSmallScreen && 'absolute lg:ml-0 lg:mr-0 ' + (left ? '-ml-[10%]' : '-mr-[10%]'),
                isActive ? 'w-20' : 'w-16',
            )}
            style={!isSmallScreen ? {
                top,
                left,
                right,
            } : undefined}
            ref={ref}
        >
            <Link
                onClick={() => {
                    if(isActive) return increaseCombo(id);
                    cancelCombo();
                }}
                scroll={false}
                href={isActive ? `/?a=${getRandomArtist(id)}` : `/?a=${id}`}
                className={clsx(
                    "pointer-events-auto overflow-hidden border-[3px] duration-300 transition-[transform,border-radius,border-color]",
                    isActive ? (
                        "active:scale-[.85] rounded-xl " + (isPopular ? 'gradient-border' : 'border-text-secondary')
                    ) : (
                        "border-tertiary rounded-[40px] hover:rounded-[20px]"
                    )
                )}
                replace={isPlaying}
                aria-label={`View ${name}'s stats`}
            >
                <SpotifyImage 
                    src={images.at(-1)?.url}
                    width={100}
                    height={100}
                />
            </Link>
        </div>
    )
}