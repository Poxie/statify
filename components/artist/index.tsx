import { SpotifyArtist } from "@/types";
import Image from "next/image";
import Chip from "../chip";

export default function Artist({
    name,
    genres,
    popularity,
    external_urls: { spotify: artistUrl },
    followers: { total: totalFollowers },
    images: [ _, image ],
    isPopular,
}: SpotifyArtist & { isPopular?: boolean }) {
    return(
        <div className="flex gap-3 p-[1px]">
            <Image 
                width={100}
                height={100}
                src={image.url}
                alt={`${name}'s icon`}
                className={`w-28 aspect-square rounded-lg ${isPopular ? 'gradient-border [--border-left:3px] [--border-right:3px] [--border-bottom:3px] [--border-top:3px]' : 'border-[3px] border-tertiary'}`}
            />
            <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-3">
                    <span className={`text-lg font-semibold ${isPopular ? 'gradient-text' : 'text-primary'}`}>
                        {name}
                    </span>
                    {isPopular && (
                        <Chip 
                            className="uppercase font-bold"
                            type={'gradient'}
                        >
                            Top Artist
                        </Chip>
                    )}
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