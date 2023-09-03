import { SpotifyArtist } from "@/types";
import { fetchFromSpotify } from "@/utils/fetchFromSpotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { artistId } }: {
    params: { artistId: string };
}) {
    const data = await fetchFromSpotify<{ artists: SpotifyArtist[] }>(`/artists/${artistId}/related-artists`);
    return NextResponse.json(data.artists);
}