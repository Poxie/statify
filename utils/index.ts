import Artists from '@/assets/json/defaultArtists.json'
import { cache } from "react";

export const get = cache(async <T>(query: string, signal?: AbortSignal) => {
    const res = await fetch(query, { signal });
    const data = await res.json();

    if(data.error) {
        throw new Error(data.error.message);
    }
    return data as T;
})

export const getRandomArtist = (excludeId?: string) => {
    const includedArtists = Artists.filter(a => a.id !== excludeId);
    return includedArtists[Math.floor(Math.random() * includedArtists.length)].id;
}