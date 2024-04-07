import { revalidateTag } from "next/cache";
import { getToken } from "./getToken"
import { CustomError } from "./customError";

export const fetchFromSpotify: (<T>(query: string) => Promise<T>) = async <T>(query: string) => {
    const token = await getToken();
    const res = await fetch(`${process.env.SPOTIFY_API_URL}${query}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded.',
        },
    })
    const data = await res.json();
    if(data.error) {
        if(data.error.message.includes('expired')) {
            revalidateTag('access-token');
            return await fetchFromSpotify(query);
        }
        throw new CustomError(data.error.message, res.status);
    }
    return data as T;
}