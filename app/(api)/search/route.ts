import { NextRequest, NextResponse } from "next/server";
import { fetchFromSpotify } from "../fetchFromSpotify";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');
    const type = searchParams.get('type') || 'artist';

    const data = await fetchFromSpotify<any>(`/search?q=${q}&type=${type}`);
    const items = data[`${type}s`].items;

    return NextResponse.json(items);
}