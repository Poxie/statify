import Artists from '@/assets/json/defaultArtists.json';
import { SpotifyArtist } from "@/types";
import HeaderArtistList from "./HeaderArtistList";
import { fetchFromSpotify } from '@/utils/fetchFromSpotify';

export default async function HeaderArtists() {
    const positions: {top: string, left?: string, right?: string, parallax: number}[] = [];
    const artistIds = Artists.map(({ id, top, left, right, parallax }) => {
        positions.push({ top, left, right, parallax });
        return id;
    }).join(',');

    const { artists } = await fetchFromSpotify<{ artists: SpotifyArtist[] }>(`/artists?ids=${artistIds}`);

    return(
        <HeaderArtistList 
            artists={artists}
            positions={positions}
        />
    )
}