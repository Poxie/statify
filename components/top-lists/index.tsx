import { SpotifyPlaylist } from "@/types";
import { fetchFromSpotify } from "@/utils/fetchFromSpotify";
import TopListSearch from "./TopListSearch";

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
        <>
            <div className="w-[800px] max-w-full mx-auto grid gap-3">
                <h1 className="text-4xl font-semibold text-center">
                    These are the top hits {country.toLowerCase() === 'global' ? (
                        'globally'
                    ) : (
                        <>
                        in{' '}
                        <span>
                            {country}
                        </span>
                        </>
                    )}
                </h1>
                <TopListSearch />
            </div>
        </>
    )
}