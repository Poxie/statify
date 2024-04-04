export type SpotifyOwner = {
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: 0;
    };
    href: string;
    id: string;
    type: 'user';
    uri: string;
    display_name: string;
}
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
export type SpotifyTrackWithColor = SpotifyTrack & {
    color: string;
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
export type SpotifyPlaylist = {
    collaborative: boolean;
    description: string;
    external_urls: { spotify: string };
    followers: { total: number };
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    owner: SpotifyOwner;
    public: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: {
            added_at: string;
            added_by: SpotifyOwner;
            is_local: boolean;
            track: SpotifyTrack & {
                color: string | undefined;
            };
        }[];
    };
    type: string;
    uri: string;
}
export type SpotifyUser = {
    display_name: string;
    externalUrls: {
        spotify: string;
    };
    followers: {
        href: string | null;
        total: number;
    };
    href: string;
    id: string;
    images: {
        height: number | null;
        url: string;
        width: number | null;
    }[];
    type: string;
    uri: string;
}