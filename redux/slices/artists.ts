import { SpotifyAlbum, SpotifyArtist, SpotifyFeaturedAlbum, SpotifyTrack } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: {
    [id: string]: Partial<{
        topTracks: SpotifyTrack[];
        topAlbums: SpotifyAlbum[];
        featuredAlbums: SpotifyFeaturedAlbum[];
        relatedArtists: SpotifyArtist[];
    }> | undefined;
} = {};

const getPrevArtist = (state: typeof initialState, artistId: string) => (
    state[artistId] || {}
);

const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {
        setArtistTopTracks: (state, action: PayloadAction<{ artistId: string, topTracks: SpotifyTrack[] }>) => {
            const prevArtist = getPrevArtist(state, action.payload.artistId);

            state[action.payload.artistId] = {
                ...prevArtist,
                topTracks: action.payload.topTracks,
            }
        },
        setArtistTopAlbums: (state, action: PayloadAction<{ artistId: string, topAlbums: SpotifyAlbum[] }>) => {
            const prevArtist = getPrevArtist(state, action.payload.artistId);

            state[action.payload.artistId] = {
                ...prevArtist,
                topAlbums: action.payload.topAlbums,
            }
        },
        setArtistFeaturedAlbums: (state, action: PayloadAction<{ artistId: string, featuredAlbums: SpotifyFeaturedAlbum[] }>) => {
            const prevArtist = getPrevArtist(state, action.payload.artistId);

            state[action.payload.artistId] = {
                ...prevArtist,
                featuredAlbums: action.payload.featuredAlbums,
            }
        },
        setArtistRelatedArtists: (state, action: PayloadAction<{ artistId: string, relatedArtists: SpotifyArtist[] }>) => {
            const prevArtist = getPrevArtist(state, action.payload.artistId);

            state[action.payload.artistId] = {
                ...prevArtist,
                relatedArtists: action.payload.relatedArtists,
            }
        }
    }
})

export const { setArtistTopTracks, setArtistTopAlbums, setArtistFeaturedAlbums, setArtistRelatedArtists } = artistsSlice.actions;
export default artistsSlice.reducer;

// Hooks
export const selectArtistTopTracks = (state: RootState, artistId: string) => (
    state.artists[artistId]?.topTracks
);
export const selectArtistTopAlbums = (state: RootState, artistId: string) => (
    state.artists[artistId]?.topAlbums
);
export const selectArtistFeaturedAlbums = (state: RootState, artistId: string) => (
    state.artists[artistId]?.featuredAlbums
);
export const selectArtistRelatedArtists = (state: RootState, artistId: string) => (
    state.artists[artistId]?.relatedArtists
);