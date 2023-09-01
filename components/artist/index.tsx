import { SpotifyArtist } from "@/types";
import Image from "next/image";

const POPULARITY_THRESHOLD = 85;
export default function Artist({
    name,
    popularity,
    images: [ _, image ],
}: SpotifyArtist) {
    const isPopular = popularity > POPULARITY_THRESHOLD;

    return(
        <div className="gradient-border rounded-lg p-[1px] [--border-left:3px] [--border-right:3px] [--border-bottom:3px] [--border-top:3px]">
            <Image 
                width={100}
                height={100}
                src={image.url}
                alt={`${name}'s icon`}
                className="w-28 aspect-square rounded-[0.22rem]"
            />
        </div>
    )
}