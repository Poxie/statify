import { fetchFromSpotify } from "@/app/(api)/fetchFromSpotify";
import { SpotifyTrack } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const artistId = req.url.split('/').at(-2);
    const data = await fetchFromSpotify<{ tracks: SpotifyTrack[] }>(`/artists/${artistId}/top-tracks?market=US&limit=50`);
    return NextResponse.json(data.tracks);
}