export type SpotifyImage = {
    height: number | null;
    url: string;
    width: number | null;
}
export type SpotifyArtist = {
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
export type SpotifyAlbum = {
    id: string;
    name: string;
    release_date: string;
    total_tracks: number;
    images: SpotifyImage[];
}
export type SpotifyTrack = {
    id: string;
    name: string;
    artists: SpotifyArtist[];
    album: SpotifyAlbum;
    duration_ms: number;
    popularity: number;
    preview_url: string | null;
    external_urls: {
        spotify: string;
    };
    uri: string;
    href: string;
}
export type SpotifyFeaturedAlbum = {
    album_group: string;
    album_type: string;
    artists: SpotifyArtist[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
};