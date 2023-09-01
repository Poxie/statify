import { SpotifyArtist } from "@/types";
import Image from "next/image";
import Chip from "../chip";

const POPULARITY_THRESHOLD = 85;
export default function Artist({
    name,
    genres,
    popularity,
    followers: { total: totalFollowers },
    images: [ _, image ],
}: SpotifyArtist) {
    const isPopular = popularity > POPULARITY_THRESHOLD;

    return(
        <div className="flex gap-3 p-[1px]">
            <Image 
                width={100}
                height={100}
                src={image.url}
                alt={`${name}'s icon`}
                className="w-28 aspect-square gradient-border rounded-lg [--border-left:3px] [--border-right:3px] [--border-bottom:3px] [--border-top:3px]"
            />
            <div className="flex flex-col items-start gap-1">
                <div className="relative">
                    <span className="text-lg font-semibold gradient-text">
                        {name}
                    </span>
                    <Chip 
                        className="absolute left-[calc(100%+12px)] top-2/4 -translate-y-2/4 whitespace-nowrap uppercase font-bold"
                        type={'gradient'}
                    >
                        Top Artist
                    </Chip>
                </div>
                <span className="text-xs text-secondary">
                    {totalFollowers.toLocaleString()} followers
                </span>
                <span className="text-xs text-secondary">
                    Current popularity {popularity}
                </span>
                <div className="flex gap-1 mt-1">
                    {genres.map(genre => (
                        <Chip key={genre}>
                            {genre.slice(0,1).toUpperCase() + genre.slice(1)}
                        </Chip>
                    ))}
                </div>
            </div>
        </div>
    )
}