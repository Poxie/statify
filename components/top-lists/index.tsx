import { SpotifyPlaylist } from "@/types";
import { fetchFromSpotify } from "@/utils/fetchFromSpotify";
import TopListSearch from "./TopListSearch";
import TopListTracks from "./TopListTracks";
import Countries from '@/assets/json/countries.json';
import TopListPopularTracks from "./TopListPopularTracks";
import Vibrant from 'node-vibrant';

const TOP_TRACKS_COUNT = 15;
const getTopByCountry = async (country: string) => {
    const playlistQuery = `top 50 - ${country}`;
    const { playlists: { items } } = await fetchFromSpotify<{ 
        playlists: {
            items: { id: string }[];
        } 
    }>(`/search?q=${playlistQuery}&type=playlist`);
    
    const playlistId = items.at(0)?.id;
    if(!playlistId) throw new Error('Playlist not found.');

    const playlist = await fetchFromSpotify<SpotifyPlaylist>(`/playlists/${playlistId}`);

    const tracks = [];
    for(const item of playlist.tracks.items.slice(0, TOP_TRACKS_COUNT)) {
        const colors = await new Vibrant(item.track.album.images.at(-1)?.url || '', { colorCount: 5 }).getPalette();
        const rgb = colors.DarkVibrant?.rgb;
        if(!rgb) {
            tracks.push(item.track);
            continue;
        }

        item.track.color = `${rgb[0]} ${rgb[1]} ${rgb[2]}`;
        tracks.push(item.track);
    }

    return {
        href: playlist.external_urls.spotify,
        name: playlist.name,
        owner: playlist.owner,
        tracks,
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
    const isTopList = name.toLowerCase().includes('top') && owner.display_name === 'Spotify';
    return(
        <main className="py-10 sm:py-20 pb-42 flex flex-col gap-8">
            <div className="w-[600px] max-w-main mx-auto text-center">
                <h1 className="text-4xl font-semibold">
                    These are {isTopList ? 'the top' : 'some'} hits {country.toLowerCase() === 'global' ? (
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
                <span className="block mt-4 mb-6 sm:text-xl text-secondary">
                    It is time to leave your country’s bobble. This is a way to explore the culture of countries all around the world.
                </span>
                <TopListSearch />
            </div>
            <TopListPopularTracks 
                tracks={tracks.slice(0,5)}
                colors={colors}
            />
            <TopListTracks 
                tracks={tracks.slice(5)}
                playlistHref={href}
                playlistName={name}
                owner={owner}
            />
        </main>
    )
}