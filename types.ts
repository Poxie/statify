export type SpotifyImage {
    height: number | null;
    url: string;
    width: number | null;
}
export type SpotifyArtist {
    external_urls: {
        spotify: string;
    };
    followers: {
        href: null;
        total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    popularity: number;
    type: 'artist';
    uri: string;
}