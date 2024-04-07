import { CustomError } from "./customError";

export default async function fetchFromSpotifyWithAuth<T>(query: string, token: string | undefined) {
    const res = await fetch(`${process.env.SPOTIFY_API_URL}${query}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const data = await res.json();
    if(!res.ok) {
        throw new CustomError(data.error.message, res.status);
    }

    return data as T;
}