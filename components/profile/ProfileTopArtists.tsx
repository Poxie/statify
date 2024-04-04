import { SpotifyArtist } from "@/types"
import SpotifyImage from "../spotify-image";
import { twMerge } from "tailwind-merge";

export default function ProfileTopArtist({ artist, artistNumber }: {
    artist: SpotifyArtist;
    artistNumber: number;
}) {
    const image = artist.images.at(-1)?.url;
    return(
        <div className="flex flex-col">
            <div className="flex gap-2 self-center">
                <SpotifyImage 
                    src={image}
                    height={120}
                    width={120}
                    className="w-16"
                />
                <div className="flex flex-col">
                    <span className="text-xl font-semibold">
                        {artist.name}
                    </span>
                    <span className="text-xs text-secondary">
                        {artist.followers.total.toLocaleString()} followers
                    </span>
                </div>
            </div>
            <div className="gradient-border mt-4 rounded-lg overflow-hidden">
                <div className={twMerge(
                    "flex-1 flex gap-0.5 items-end font-bold justify-center bg-secondary",
                    artistNumber === 1 && 'py-10',
                    artistNumber === 2 && 'py-6',
                    artistNumber === 3 && 'py-3',
                )}>
                    <span className="block text-secondary text-lg translate-y-[0.1rem]">
                        #
                    </span>
                    <span className={twMerge(
                        "text-2xl",
                        artistNumber === 1 && 'text-5xl',
                        artistNumber === 2 && 'text-3xl',
                    )}>
                        {artistNumber}
                    </span>
                </div>
            </div>
        </div>
    )
}