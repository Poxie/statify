import { fetchFromSpotify } from "@/app/(api)/fetchFromSpotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const artistId = req.url.split('/').at(-2);
    const featured = await fetchFromSpotify(`/artists/${artistId}/albums?include_groups=appears_on&limit=50`);
    return NextResponse.json(featured.items);
}