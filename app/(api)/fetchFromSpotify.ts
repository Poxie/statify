import { getToken } from "./getToken"

export const fetchFromSpotify = async (query: string) => {
    const token = await getToken();
    try {
        const res = await fetch(`${process.env.SPOTIFY_API_URL}${query}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded.',
            },
            next: { revalidate: 3600 }
        })
        return await res.json();
    } catch(error: any) {
        throw new Error(error.message);
    }
}