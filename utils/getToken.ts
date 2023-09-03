export const getToken = async () => {
    const basicAuth = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
    const res = await fetch(`${process.env.TOKEN_URL}?grant_type=client_credentials`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        next: {
            revalidate: 3600,
            tags: ['access-token'],
        }
    });
    const data = await res.json();
    return data.access_token;
}