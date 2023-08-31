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
    top: string;
    left?: string;
    right?: string;
}) {
    const currentArtistId = useSearchParams().get('a');
    const isActive = currentArtistId === id;
    return(
        <Link
            href={isActive ? '/' : `/?a=${id}`} 
            className={`absolute w-16 aspect-square last:translate-y-[260%] ${left ? '-translate-x-[160%]' : 'translate-x-[160%]'} lg:translate-x-0 last:lg:translate-y-0`}
            style={{
                top,
                left,
                right,
            }}
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