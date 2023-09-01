import { NextRequest, NextResponse } from "next/server";
import { fetchFromSpotify } from "../../fetchFromSpotify";
import { SpotifyArtist } from "@/types";

export async function GET(req: NextRequest) {
    const artistId = req.url.split('/').at(-1);
    const artist = await fetchFromSpotify<SpotifyArtist>(`/artists/${artistId}`);
    return NextResponse.json(artist);
}