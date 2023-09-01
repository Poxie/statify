import { SpotifyArtist } from "@/types";
import Image from "next/image";
import Chip from "../chip";

export default function Artist({ artist, isPopular, small }: { 
    artist: SpotifyArtist | undefined, 
    isPopular?: boolean; 
    small?: boolean;
}) {
    if(!artist) {
        return(
            <div>
                <div className="w-28 aspect-square" />
            </div>
        )
    }
    
    const {
        name,
        genres,
        popularity,
        external_urls: { spotify: artistUrl },
        followers: { total: totalFollowers },
        images: [ _, image ],
    } = artist;
    return(
        <div className="flex gap-3">
            <Image 
                width={100}
                height={100}
                src={image.url}
                alt={`${name}'s icon`}
                className={`${small ? 'w-24' : 'w-28'} aspect-square object-cover rounded-lg ${isPopular ? 'gradient-border [--border-left:3px] [--border-right:3px] [--border-bottom:3px] [--border-top:3px]' : 'border-[3px] border-tertiary'}`}
            />
            <div className="flex flex-col items-start gap-1">
                <div className={`flex items-center ${small ? 'gap-2' : 'gap-3'}`}>
                    <span className={`${small ? 'text-sm' : 'text-lg'} font-semibold ${isPopular ? 'gradient-text' : 'text-primary'}`}>
                        {name}
                    </span>
                    {isPopular && (
                        <Chip 
                            className={`uppercase font-bold ${small ? 'text-[8px]' : ''}`}
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
                    {genres.slice(0, small ? 2 : genres.length).map(genre => (
                        <Chip
                            className={small ? 'text-[8.5px]' : undefined}
                            key={genre}
                        >
                            {genre.slice(0,1).toUpperCase() + genre.slice(1)}
                        </Chip>
                    ))}
                </div>
            </div>
        </div>
    )
}