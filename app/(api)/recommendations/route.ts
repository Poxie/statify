import { SpotifyTrack } from "@/types";
import { fetchFromSpotify } from "@/utils/fetchFromSpotify";
import { NextRequest, NextResponse } from "next/server";
import { getTrackColors } from "../utils";

export async function GET(req: NextRequest) {
    const { search } = new URL(req.url);
    
    const data = await fetchFromSpotify<{ tracks: SpotifyTrack[] }>(`/recommendations${search}`);
    const tracks = await getTrackColors(data.tracks);

    return NextResponse.json(tracks);
}