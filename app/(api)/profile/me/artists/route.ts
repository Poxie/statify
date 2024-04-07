
import { SpotifyArtist } from "@/types";
import fetchFromSpotifyWithAuth from "@/utils/fetchFromSpotifyWithAuth";
import getUserToken from "@/utils/getUserToken";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_TIME_RANGE = 'medium_term';
export async function GET(req: NextRequest) {
    const timeRange = req.nextUrl.searchParams.get('time_range') || DEFAULT_TIME_RANGE;

    const token = getUserToken(req.headers);
    const data = await fetchFromSpotifyWithAuth<{
        items: SpotifyArtist[];
    }>(`/me/top/artists?limit=50&time_range=${timeRange}`, token);

    return NextResponse.json(data.items);
}