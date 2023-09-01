import { fetchFromSpotify } from "@/app/(api)/fetchFromSpotify";
import { SpotifyFeaturedAlbum } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const artistId = req.url.split('/').at(-2);
    const featured = await fetchFromSpotify<{ items: SpotifyFeaturedAlbum[] }>(`/artists/${artistId}/albums?include_groups=appears_on&limit=50`);
    return NextResponse.json(featured.items);
}