import { SpotifyArtist } from "@/types"
import SpotifyImage from "../spotify-image";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import ProfileTopArtistSkeleton from "../skeleton/profile-top-artist";

export default function ProfileTopArtist({ artist, artistNumber }: {
    artist: SpotifyArtist | undefined;
    artistNumber: number;
}) {
    const image = artist?.images.at(-1)?.url;
    const link = `/?a=${artist?.id}`;
    return(
        <div className={twMerge(
            "flex flex-col",
            artistNumber === 1 && 'order-0 md:order-[unset]',
            artistNumber === 2 && 'order-1 md:order-[unset]',
            artistNumber === 3 && 'order-2 md:order-[unset]',
        )}>
            <div className="px-4 md:px-0 flex gap-2 md:self-center">
                {artist && (
                    <>
                    <Link href={link}>
                        <SpotifyImage 
                            src={image}
                            height={120}
                            width={120}
                            className="w-16"
                        />
                    </Link>
                    <div className="flex flex-col">
                        <Link 
                            className="text-xl font-semibold hover:text-c-primary transition-colors"
                            href={link}
                        >
                            {artist.name}
                        </Link>
                        <span className="text-xs text-secondary">
                            {artist.followers.total.toLocaleString()} followers
                        </span>
                    </div>
                    </>
                )}
                {!artist && (
                    <ProfileTopArtistSkeleton />
                )}
            </div>
            <div className="gradient-border mt-4 rounded-lg overflow-hidden">
                <div className={twMerge(
                    "py-3 flex-1 flex gap-0.5 items-end font-bold justify-center bg-secondary",
                    artistNumber === 1 && 'md:py-10',
                    artistNumber === 2 && 'md:py-6',
                )}>
                    <span className="block text-secondary text-lg translate-y-[0.1rem]">
                        #
                    </span>
                    <span className={twMerge(
                        "text-2xl",
                        artistNumber === 1 && 'md:text-5xl',
                        artistNumber === 2 && 'md:text-3xl',
                    )}>
                        {artistNumber}
                    </span>
                </div>
            </div>
        </div>
    )
}