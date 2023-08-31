import { getToken } from "./getToken"

export const fetchFromSpotify = async (query: string) => {
    const token = await getToken();
    const res = await fetch(`${process.env.SPOTIFY_API_URL}${query}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded.',
        }
    })
    return await res.json();
}