import { NextRequest, NextResponse } from "next/server";
import { fetchFromSpotify } from "../../fetchFromSpotify";

export async function GET(req: NextRequest) {
    const artistId = req.url.split('/').at(-1);
    const artist = await fetchFromSpotify(`/artists/${artistId}`);
    
    return NextResponse.json(artist);
}