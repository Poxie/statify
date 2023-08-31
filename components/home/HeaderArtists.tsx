import HeaderArtist from "./HeaderArtist"
import Artists from '@/assets/json/defaultArtists.json';

export default function HeaderArtists() {
    return(
        <>
            <div>
                {Artists.slice(0,3).map(artist => (
                    <HeaderArtist 
                        {...artist}
                        key={artist.id}
                    />
                ))}
            </div>
            <div>
                {Artists.slice(3).map(artist => (
                    <HeaderArtist 
                        {...artist}
                        key={artist.id}
                    />
                ))}
            </div>
        </>
    )
}