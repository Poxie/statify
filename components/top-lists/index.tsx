import { SpotifyPlaylist } from "@/types";
import { fetchFromSpotify } from "@/utils/fetchFromSpotify";

const getTopByCountry = async (country: string) => {
    const playlistQuery = `spotify top 50 - ${country}`;
    const { playlists: { items } } = await fetchFromSpotify<{ 
        playlists: {
            items: { id: string }[];
        } 
    }>(`/search?q=${playlistQuery}&type=playlist`);
    
    const playlistId = items.at(0)?.id;
    if(!playlistId) throw new Error('Playlist not found.');

    const playlist = await fetchFromSpotify<SpotifyPlaylist>(`/playlists/${playlistId}`);

    return {
        href: playlist.href,
        name: playlist.name,
        owner: playlist.owner,
        tracks: playlist.tracks.items,
    }
}

export default async function TopLists({ searchParams: { country='global' } }: {
    searchParams: { country?: string }; 
}) {
    const { tracks } = await getTopByCountry(country);

    return(
        <div>
            {tracks.map(track => (
                track.track.name
            ))}
        </div>
    )
}