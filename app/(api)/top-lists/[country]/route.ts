import Vibrant from "node-vibrant";
import { SpotifyPlaylist } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { fetchFromSpotify } from "@/utils/fetchFromSpotify";

const TOP_TRACKS_COUNT = 15;
export async function GET(req: NextRequest, { params: { country } }: {
    params: { country: string };
}) {
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

    return NextResponse.json({
        playlistInfo: {
            href: playlist.external_urls.spotify,
            name: playlist.name,
            owner: playlist.owner,
        },
        tracks,
    })
}