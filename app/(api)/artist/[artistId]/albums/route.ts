import { fetchFromSpotify } from "@/app/(api)/fetchFromSpotify";
import { SpotifyAlbum } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const artistId = req.url.split('/').at(-2);
    const data = await fetchFromSpotify<{ items: SpotifyAlbum[] }>(`/artists/${artistId}/albums`);
    return NextResponse.json(data.items);
}