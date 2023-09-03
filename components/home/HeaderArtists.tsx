import HeaderArtist from "./HeaderArtist"
import Artists from '@/assets/json/defaultArtists.json';

export default function HeaderArtists() {
    return(
        <>
            <div className="absolute overflow-hidden w-full h-full pointer-events-none">
                {Artists.map(artist => (
                    <HeaderArtist 
                        {...artist}
                        key={artist.id}
                    />
                ))}
            </div>
        </>
    )
}