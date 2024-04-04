export default async function fetchFromSpotifyWithAuth<T>(query: string, token: string | undefined) {
    const res = await fetch(`${process.env.SPOTIFY_API_URL}${query}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const data = await res.json();
    if(data.error) {
        throw new Error(data.error.message);
    } 

    return data as T;
}