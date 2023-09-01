import { cache } from "react";

export const get = cache(async <T>(query: string) => {
    const res = await fetch(query);
    const data = await res.json();

    if(data.error) {
        throw new Error(data.error.message);
    }
    return data as T;
})