import { SpotifyArtist } from "@/types";
import Image from "next/image";
import Chip from "../chip";
import Link from "next/link";
import { HasTooltip } from "@/contexts/tooltip/HasTooltip";
import { QuestionIcon } from "@/assets/icons/QuestionIcon";
import { POPULARITY_THRESHOLD } from "@/utils/constants";
import SpotifyImage from "../spotify-image";

export default function Artist({ artist, hasPopularityExplanation, isPopular, small }: { 
    artist: SpotifyArtist | undefined,
    hasPopularityExplanation?: boolean;
    isPopular?: boolean; 
    small?: boolean;
}) {
    if(!artist) {
        return(
            <div className={`${small ? 'w-24' : 'w-28'} aspect-square`} />
        )
    }
    
    const {
        id,
        name,
        genres,
        popularity,
        external_urls: { spotify: artistUrl },
        followers: { total: totalFollowers },
        images,
    } = artist;
    return(
        <div className="flex items-start gap-3">
            <SpotifyImage 
                width={100}
                height={100}
                src={images.at(-1)?.url}
                className={`${small ? 'w-24' : 'w-28'} border-[3px] ${isPopular ? 'gradient-border [--border-left:3px] [--border-right:3px] [--border-bottom:3px] [--border-top:3px]' : 'border-[3px] border-tertiary'}`}
            />
            <div className="flex flex-col items-start gap-1">
                <div className={`flex items-center flex-wrap-reverse`}>
                    <Link 
                        className={`${small ? 'text-sm mr-2' : 'text-lg mr-3'} font-semibold ${isPopular ? 'gradient-text' : 'text-primary'}`}
                        href={`/?a=${id}`}
                        scroll={false}
                    >
                        {name}
                    </Link>
                    {isPopular && (
                        <HasTooltip 
                            className="cursor-default flex"
                            tooltip={`${artist.name} has a popularity index that\'s greater than ${POPULARITY_THRESHOLD}.`}
                            delay={250}
                        >
                            <Chip 
                                className={`uppercase font-bold ${small ? 'text-[8px]' : ''}`}
                                type={'gradient'}
                            >
                                Top Artist
                            </Chip>
                        </HasTooltip>
                    )}
                </div>
                <span className="text-xs text-secondary">
                    {totalFollowers.toLocaleString()} followers
                </span>
                <span className="text-xs text-secondary flex items-center gap-1.5">
                    Current popularity {popularity}
                    
                    {hasPopularityExplanation && (
                        <HasTooltip 
                            tooltip={'Popularity is based on how popular their songs are compared to other artists.'}
                            delay={250}
                        >
                            <QuestionIcon className="w-3" />
                        </HasTooltip>
                    )}
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
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