import { SpotifyArtist } from "@/types"
import SpotifyImage from "../spotify-image";
import Link from "next/link";
import ProfileIndexLabel from "./ProfileIndexLabel";

export default function ProfileArtist({ artist, index }: {
    artist: SpotifyArtist;
    index: number;
}) {
    const image = artist.images[0]?.url;
    const link = `/?a=${artist.id}`;
    return(
        <div className="group relative">
            <ProfileIndexLabel 
                index={index}
            />
            <Link 
                className="block border-2 border-tertiary rounded-lg overflow-hidden"
                href={link}
            >
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