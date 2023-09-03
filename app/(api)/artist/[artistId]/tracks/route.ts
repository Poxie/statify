import { SpotifyTrack } from "@/types";
import { fetchFromSpotify } from "@/utils/fetchFromSpotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { artistId } }: {
    params: { artistId: string };
}) {
    const data = await fetchFromSpotify<{ tracks: SpotifyTrack[] }>(`/artists/${artistId}/top-tracks?market=US&limit=50`);
    return NextResponse.json(data.tracks);
}