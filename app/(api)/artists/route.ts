import { NextRequest, NextResponse } from "next/server";
import { fetchFromSpotify } from "../fetchFromSpotify";
import { SpotifyArtist } from "@/types";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const artistIds = searchParams.get('ids');

    const { artists } = await fetchFromSpotify<{ artists: SpotifyArtist[] }>(`/artists?ids=${artistIds}`);
    
    return NextResponse.json(artists);
}