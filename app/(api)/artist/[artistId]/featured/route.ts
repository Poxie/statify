import { SpotifyFeaturedAlbum } from "@/types";
import { fetchFromSpotify } from "@/utils/fetchFromSpotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { artistId } }: {
    params: { artistId: string };
}) {
    const featured = await fetchFromSpotify<{ items: SpotifyFeaturedAlbum[] }>(`/artists/${artistId}/albums?include_groups=appears_on&limit=50`);
    return NextResponse.json(featured.items);
}