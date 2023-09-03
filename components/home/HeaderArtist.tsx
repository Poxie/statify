"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const MIN_PARALLAX = 4;
const MAX_PARALLAX = 18;
const MAX_TRANSLATION_X = 5;
const MAX_TRANSLATION_Y = 2;
export default function HeaderArtist({
    id,
    image,
    top,
    left,
    right,
}: {
    id: string;
    image: string;
    top: string;
    left?: string;
    right?: string;
}) {
    const currentArtistId = useSearchParams().get('a');
    const isActive = currentArtistId === id;
    
    const ref = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const randomParallaxShift = Math.random() * (MAX_PARALLAX - MIN_PARALLAX) + MIN_PARALLAX;
        console.log(randomParallaxShift);
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
            className={`absolute w-16 aspect-square ${left ? '-ml-[10%]' : '-mr-[10%]'} lg:ml-0 lg:mr-0`}
            style={{
                top,
                left,
                right,
            }}
            ref={ref}
        >
            <Image 
                className={`duration-500ms object-cover w-full h-full transition-[border-radius] ${isActive ? 'rounded-xl' : 'rounded-[30px] hover:rounded-3xl'}`}
                src={image}
                width={100}
                height={100}
                alt={``}
            />
        </Link>
    )
}