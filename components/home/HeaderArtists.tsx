import Artists from '@/assets/json/defaultArtists.json';
import { SpotifyArtist } from "@/types";
import HeaderArtistList from "./HeaderArtistList";

export default async function HeaderArtists() {
    const positions: {top: string, left?: string, right?: string}[] = [];
    const artistIds = Artists.map(({ id, top, left, right }) => {
        positions.push({ top, left, right });
        return id;
    }).join(',');

    const artists: SpotifyArtist[] = await fetch(`${process.env.BACKEND_API_URL}/artists?ids=${artistIds}`, {next: {revalidate:3600}}).then(res => res.json());

    return(
        <HeaderArtistList 
            artists={artists}
            positions={positions}
        />
    )
}