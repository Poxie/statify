import { SpotifyArtist } from "@/types";
import SpotifyImage from "../spotify-image";
import Link from "next/link";

export default function ProfileTopArtist({ artist }: {
    artist: SpotifyArtist;
}) {
    const link = `/?a=${artist.id}`;
    const image = artist.images.at(-1)?.url;
    return(
        <div className="flex gap-2">
            <Link 
                href={link}
                aria-label={artist.name}
            >
                <SpotifyImage 
                    height={120}
                    width={120}
                    src={image}
                    className="w-24"
                />
            </Link>
            <div className="flex flex-col">
                <Link 
                    className="text-lg md:text-xl font-semibold hover:text-c-primary transition-colors"
                    href={link}
                >
                    {artist.name}
                </Link>
                <span className="text-xs text-secondary">
                    {artist.followers.total.toLocaleString()} followers
                </span>
            </div>
        </div>
    )
}