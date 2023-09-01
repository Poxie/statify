import { fetchFromSpotify } from "@/app/(api)/fetchFromSpotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const artistId = req.url.split('/').at(-2);
    const data = await fetchFromSpotify(`/artists/${artistId}/related-artists`);
    return NextResponse.json(data.artists);
}