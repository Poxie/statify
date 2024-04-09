import { SpotifyArtist, SpotifyTrack } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: {
    [id: string]: {
        topTracks: SpotifyTrack[];
    } | undefined;
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
        }
    }
})

export const { setArtistTopTracks } = artistsSlice.actions;
export default artistsSlice.reducer;

// Hooks
export const selectArtistTopTracks = (state: RootState, artistId: string) => (
    state.artists[artistId]?.topTracks
);