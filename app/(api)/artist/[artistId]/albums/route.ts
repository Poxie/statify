import { SpotifyAlbum } from "@/types";
import { fetchFromSpotify } from "@/utils/fetchFromSpotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { artistId } }: {
    params: { artistId: string };
}) {
    const data = await fetchFromSpotify<{ items: SpotifyAlbum[] }>(`/artists/${artistId}/albums`);
    return NextResponse.json(data.items);
}