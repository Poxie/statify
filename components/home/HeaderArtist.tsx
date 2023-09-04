"use client";
import { SpotifyArtist } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import SpotifyImage from "../spotify-image";
import { POPULARITY_THRESHOLD } from "@/utils/constants";
import { useActiveArtistId } from "@/hooks/useActiveArtistId";
import { getRandomArtist } from "@/utils";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useCombo } from "@/contexts/combo";
import { HeaderArtistItem } from "./HeaderArtists";

const MIN_PARALLAX = 4;
const MAX_PARALLAX = 18;
const MAX_TRANSLATION_X = 5;
const MAX_TRANSLATION_Y = 1;
export default function HeaderArtist({ id, popularity, images, top, left, right, parallax }: SpotifyArtist & HeaderArtistItem) {
    const paramArtistId = useSearchParams().get('a');
    const activeArtistId = useActiveArtistId();
    const isActive = id === activeArtistId;
    
    const screenSize = useScreenSize();
    const isSmallDevice = ['xs', 'sm'].includes(screenSize);

    const { increaseCombo, cancelCombo } = useCombo();
    
    const ref = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if(!ref.current) return;
        if(isSmallDevice) {
            ref.current.style.transform = '';
            return;
        }

        const onMouseMove = (e: MouseEvent) => {
            if(!ref.current) return;

            const width = window.innerWidth;
            const height = window.innerHeight;
            const mouseXPos = e.clientX;
            const mouseYPos = e.clientY;

            const widthPart = width / 2;
            const relativeXPos = widthPart - mouseXPos;
            const translateXPercentage = relativeXPos / widthPart;

            const heightPart = height / 2;
            const relativeYPart = heightPart - mouseYPos;
            const translateYPercentage = relativeYPart / heightPart;

            ref.current.style.transform = `translateY(${translateYPercentage * -(MAX_TRANSLATION_Y + parallax)}px) translateX(${translateXPercentage * -(MAX_TRANSLATION_X + parallax)}px)`;
        }

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, [isSmallDevice]);

    return(
        <Link
            onClick={() => {
                if(isActive) return increaseCombo(id);
                cancelCombo();
            }}
            scroll={false}
            href={isActive ? `/?a=${getRandomArtist(id)}` : `/?a=${id}`}
            className={`pointer-events-auto border-[3px] duration-300 transition-[border-radius,border-color,width] ${isActive ? 'rounded-xl w-20 ' + (popularity > POPULARITY_THRESHOLD ? 'gradient-border' : 'border-text-secondary') : 'border-tertiary rounded-[40px] hover:rounded-[20px] w-16'} overflow-hidden ${!isSmallDevice ? 'absolute lg:ml-0 lg:mr-0 ' + (left ? '-ml-[10%]' : '-mr-[10%]') : ''} aspect-square`}
            style={!isSmallDevice ? {
                top,
                left,
                right,
            } : undefined}
            ref={ref}
        >
            <SpotifyImage 
                src={images.at(-1)?.url}
                width={100}
                height={100}
            />
        </Link>
    )
}