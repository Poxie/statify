import { SpotifyArtist, SpotifyTrack } from "@/types";
import { fetchFromSpotify } from "@/utils/fetchFromSpotify";
import { NextRequest, NextResponse } from "next/server";

const LIMIT = 48;
export async function GET(req: NextRequest, { params: { artistId } }: {
    params: { artistId: string };
}) {
    const artist = await fetchFromSpotify<SpotifyArtist>(`/artists/${artistId}`);
    const seedArtists = artist.id;
    const seedGenres = artist.genres.slice(0,4).join(',');

    const recommendationURL = `/recommendations?seed_artists=${seedArtists}&seed_genres=${seedGenres}&limit=${LIMIT}`;
    const { tracks } = await fetchFromSpotify<{ tracks: SpotifyTrack[] }>(recommendationURL);

    return NextResponse.json(tracks);
}