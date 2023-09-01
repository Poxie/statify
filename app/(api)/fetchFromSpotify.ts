import { revalidateTag } from "next/cache";
import { getToken } from "./getToken"

export const fetchFromSpotify: (<T>(query: string) => Promise<T>) = async <T>(query: string) => {
    const token = await getToken();
    const res = await fetch(`${process.env.SPOTIFY_API_URL}${query}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded.',
        },
        next: { revalidate: 3600 }
    })
    const data = await res.json();
    if(data.error) {
        if(data.error.message.includes('expired')) {
            revalidateTag('access-token');
            return await fetchFromSpotify(query);
        }
    }
    return data as T;
}