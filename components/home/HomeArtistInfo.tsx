import Artists from '@/assets/json/defaultArtists.json';
import { SpotifyArtist } from '@/types';
import Artist from '../artist';
import Link from 'next/link';

const getRandomArtist = () => {
    return Artists[Math.floor(Math.random() * Artists.length)].id;
}

const POPULARITY_THRESHOLD = 85;
export default async function HomeArtistInfo({
    artistId
}: {
    artistId?: string;
}) {
    const artistInfo: SpotifyArtist = await fetch(`http://localhost:3000/artist/${artistId || getRandomArtist()}`, { next: { revalidate: 0 } }).then(res => res.json());
    const isPopular = artistInfo.popularity > POPULARITY_THRESHOLD;
    
    return(
        <div className={`bg-secondary mt-36 ${isPopular ? 'gradient-border [--border-left:0] [--border-right:0]' : 'border-[1px] border-tertiary'}`}>
            <div className={`relative ${isPopular ? 'gradient-border [--border-bottom:0px] [--border-left:1px] [--border-right:1px]' : 'border-[1px] border-b-0 border-tertiary'} mx-auto w-[800px] max-w-[80%] flex rounded-t-lg -translate-y-full`}>
                <div className={`absolute ${isPopular ? 'bg-[var(--gradient-from)]' : 'bg-tertiary'} bottom-0 right-full w-4 aspect-square rounded-br-lg before:absolute before:bg-secondary before:w-full before:aspect-square before:-z-[1] after:absolute after:bg-primary after:w-full after:aspect-square after:rounded-br-lg after:right-[1px] after:bottom-[1px]`} />
                <div className="flex-1 flex items-start justify-between p-4 bg-secondary rounded-t-xl">
                    <Artist
                        isPopular={isPopular}
                        {...artistInfo} 
                    />
                    <Link
                        target="_blank" 
                        href={artistInfo.external_urls.spotify}
                        className="text-xs transition-colors text-secondary hover:text-primary"
                    >
                        Follow {artistInfo.name}
                    </Link>
                </div>
                <div className={`absolute ${isPopular ? 'bg-[var(--gradient-from)]' : 'bg-tertiary'} bottom-0 left-full w-4 aspect-square rounded-bl-lg before:absolute before:bg-secondary before:w-full before:aspect-square before:-z-[1] after:absolute after:bg-primary after:w-full after:aspect-square after:rounded-bl-lg after:left-[1px] after:bottom-[1px]`} />
            </div>
        </div>
    )
}
