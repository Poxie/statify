"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function HeaderArtist({
    id,
    image,
    top,
    left,
    right,
}: {
    id: string;
    image: string;
    top: number;
    left?: number;
    right?: number;
}) {
    const currentArtistId = useSearchParams().get('a');
    return(
        <Link
            href={`/?a=${id}`} 
            className="absolute w-16 aspect-square"
            style={{
                top: `${top}px`,
                left: left ? `${left}px` : 'unset',
                right: right ? `${right}px` : 'unset',
            }}
        >
            <Image 
                className={`duration-500ms object-cover w-full h-full transition-[border-radius] ${currentArtistId === id ? 'rounded-xl' : 'rounded-[30px] hover:rounded-3xl'}`}
                src={image}
                width={100}
                height={100}
                alt={``}
            />
        </Link>
    )
}