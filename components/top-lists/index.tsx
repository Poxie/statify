import { SpotifyPlaylist } from "@/types";
import { fetchFromSpotify } from "@/utils/fetchFromSpotify";
import TopListSearch from "./TopListSearch";
import TopListTracks from "./TopListTracks";
import Countries from '@/assets/json/countries.json';
import TopListPopularTracks from "./TopListPopularTracks";

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
        tracks: playlist.tracks.items.map(item => item.track),
    }
}
const getCountryColors = (country: string) => (
    Countries.find(c => c.name.toLowerCase() === country.toLowerCase())?.colors
)

export default async function TopLists({ searchParams: { country='global' } }: {
    searchParams: { country?: string }; 
}) {
    const { tracks, name, href, owner } = await getTopByCountry(country);

    const colors = getCountryColors(country);
    return(
        <main className="py-20 grid gap-8">
            <div className="w-[800px] max-w-full mx-auto grid gap-3">
                <h1 className="text-4xl font-semibold text-center">
                    These are the top hits {country.toLowerCase() === 'global' ? (
                        'globally'
                    ) : (
                        <>
                        in{' '}
                        <span 
                            className="gradient-text font-extrabold"
                            style={colors ? { '--gradient-from': colors[0], '--gradient-to': colors[1] } as React.CSSProperties : undefined}
                        >
                            {country}
                        </span>
                        </>
                    )}
                </h1>
                <TopListSearch />
            </div>
            <TopListPopularTracks 
                tracks={tracks.slice(0,5)}
                colors={colors}
            />
        </main>
    )
}