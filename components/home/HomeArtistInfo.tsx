import Artists from '@/assets/json/defaultArtists.json';
import { SpotifyArtist } from '@/types';
import Artist from '../artist';

const getRandomArtist = () => {
    return Artists[Math.floor(Math.random() * Artists.length)].id;
}

export default async function HomeArtistInfo({
    artistId
}: {
    artistId?: string;
}) {
    const artistInfo: SpotifyArtist = await fetch(`http://localhost:3000/artist/${artistId || getRandomArtist()}`, { next: { revalidate: 0 } }).then(res => res.json());
    console.log(artistInfo);
    return(
        <div className="gradient-border [--border-left:0] [--border-right:0] bg-secondary mt-36">
            <div className="relative gradient-border [--border-bottom:0px] [--border-left:1px] [--border-right:1px] mx-auto w-[800px] max-w-[80%] flex rounded-t-lg -translate-y-full">
                <div className='absolute bg-[var(--gradient-from)] bottom-0 right-full w-4 aspect-square rounded-br-lg before:absolute before:bg-secondary before:w-full before:aspect-square before:-z-[1] after:absolute after:bg-primary after:w-full after:aspect-square after:rounded-br-lg after:right-[1px] after:bottom-[1px]' />
                <div className="p-4 bg-secondary rounded-t-xl">
                    <Artist {...artistInfo} />
                </div>
                <div className='absolute bg-[var(--gradient-to)] bottom-0 left-full w-4 aspect-square rounded-bl-lg before:absolute before:bg-secondary before:w-full before:aspect-square before:-z-[1] after:absolute after:bg-primary after:w-full after:aspect-square after:rounded-bl-lg after:left-[1px] after:bottom-[1px]' />
            </div>
        </div>
    )
}
