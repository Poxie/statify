import { SpotifyPlaylist } from "@/types";
import { fetchFromSpotify } from "@/utils/fetchFromSpotify";
import TopListSearch from "./TopListSearch";
import TopListTracks from "./TopListTracks";
import Countries from '@/assets/json/countries.json';
import TopListPopularTracks from "./TopListPopularTracks";
import Vibrant from 'node-vibrant';
import TopListHeader from "./TopListHeader";

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
    return(
        <main className="pt-10 sm:pt-20 pb-8 flex flex-col gap-8">
            <TopListHeader 
                colors={colors}
                country={country}
                owner={owner}
                playlistName={name}
            />
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