import { NextRequest, NextResponse } from "next/server";
import { SpotifyArtist } from "@/types";
import { fetchFromSpotify } from "@/utils/fetchFromSpotify";

export async function GET(req: NextRequest, { params: { artistId } }: {
    params: { artistId: string };
}) {
    const artist = await fetchFromSpotify<SpotifyArtist>(`/artists/${artistId}`);
    return NextResponse.json(artist);
}