
import { SpotifyArtist } from "@/types";
import fetchFromSpotifyWithAuth from "@/utils/fetchFromSpotifyWithAuth";
import getUserToken from "@/utils/getUserToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = getUserToken(req.headers);
    const data = await fetchFromSpotifyWithAuth<{
        items: SpotifyArtist[];
    }>(`/me/top/artists?limit=50`, token);

    return NextResponse.json(data.items);
}