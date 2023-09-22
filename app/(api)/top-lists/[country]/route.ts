import Vibrant from "node-vibrant";
import { SpotifyPlaylist } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { fetchFromSpotify } from "@/utils/fetchFromSpotify";
import { getTrackColors } from "../../utils";

const TOP_TRACKS_COUNT = 15;
export async function GET(req: NextRequest, { params: { country } }: {
    params: { country: string };
}) {
    const playlistQuery = `spotify top 50 - ${country}`;
    const { playlists: { items } } = await fetchFromSpotify<{ 
        playlists: {
            items: { id: string }[];
        } 
    }>(`/search?q=${playlistQuery}&type=playlist`);
    
    const playlistId = items.at(0)?.id;
    if(!playlistId) throw new Error('Playlist not found.');

    const playlist = await fetchFromSpotify<SpotifyPlaylist>(`/playlists/${playlistId}`);
    const tracks = await getTrackColors(playlist.tracks.items.map(item => item.track).slice(0,15));

    return NextResponse.json({
        playlistInfo: {
            href: playlist.external_urls.spotify,
            name: playlist.name,
            owner: playlist.owner,
        },
        tracks,
    })
}