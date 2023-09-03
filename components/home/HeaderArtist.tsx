"use client";
import { SpotifyArtist } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import SpotifyImage from "../spotify-image";
import { POPULARITY_THRESHOLD } from "@/utils/constants";

const MIN_PARALLAX = 4;
const MAX_PARALLAX = 18;
const MAX_TRANSLATION_X = 5;
const MAX_TRANSLATION_Y = 1;
export default function HeaderArtist({ id, popularity, images, top, left, right }: SpotifyArtist & {
    top: string;
    left?: string;
    right?: string;
}) {
    const currentArtistId = useSearchParams().get('a');
    const isActive = currentArtistId === id;
    
    const ref = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const randomParallaxShift = Math.random() * (MAX_PARALLAX - MIN_PARALLAX) + MIN_PARALLAX;
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

            ref.current.style.transform = `translateY(${translateYPercentage * -(MAX_TRANSLATION_Y + randomParallaxShift)}px) translateX(${translateXPercentage * -(MAX_TRANSLATION_X + randomParallaxShift)}px)`;
        }

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    return(
        <Link
            scroll={false}
            href={isActive ? '/' : `/?a=${id}`}
            className={`pointer-events-auto border-[3px] transition-[border-radius,border-color] ${isActive ? 'rounded-xl ' + (popularity > POPULARITY_THRESHOLD ? 'gradient-border' : 'border-text-secondary') : 'border-tertiary rounded-[40px] hover:rounded-[20px]'} overflow-hidden absolute w-16 aspect-square ${left ? '-ml-[10%]' : '-mr-[10%]'} lg:ml-0 lg:mr-0`}
            style={{
                top,
                left,
                right,
            }}
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