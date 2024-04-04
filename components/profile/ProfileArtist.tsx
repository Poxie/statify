import { SpotifyArtist } from "@/types"
import SpotifyImage from "../spotify-image";
import Link from "next/link";

export default function ProfileArtist({ artist, index }: {
    artist: SpotifyArtist;
    index: number;
}) {
    const image = artist.images[0]?.url;
    const link = `/?a=${artist.id}`;
    return(
        <div className="group">
            <Link 
                className="block relative border-2 border-tertiary rounded-lg overflow-hidden"
                href={link}
            >
                <span className="-ml-[2px] -mt-[2px] py-1.5 px-3 absolute top-0 left-0 bg-secondary bg-opacity-70 border-2 border-tertiary rounded-br-lg font-bold text-sm">
                    #{index}
                </span>
                <SpotifyImage 
                    width={250}
                    height={250}
                    src={image}
                    className="aspect-video"
                />
            </Link>
            <Link
                href={link}
                className="block mt-1 text-center text-sm group-hover:text-c-primary transition-colors"
            >
                {artist.name}
            </Link>
        </div>
    )
}