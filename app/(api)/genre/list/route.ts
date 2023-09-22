import { fetchFromSpotify } from "@/utils/fetchFromSpotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const data = await fetchFromSpotify<{ genres: string[] }>(`/recommendations/available-genre-seeds`);
    const items = data.genres;

    return NextResponse.json(items);
}