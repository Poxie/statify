import { cache } from "react";

export const get = cache(async <T>(query: string, signal?: AbortSignal) => {
    const res = await fetch(query, { signal });
    const data = await res.json();

    if(data.error) {
        throw new Error(data.error.message);
    }
    return data as T;
})