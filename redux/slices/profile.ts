
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";
import { SpotifyArtist, SpotifyTimeRange, SpotifyTrack } from "@/types";

const initialState: {
    artists: {
        loading: boolean;
        short_term: SpotifyArtist[];
        medium_term: SpotifyArtist[];
        long_term: SpotifyArtist[];
    };
    tracks: {
        loading: boolean;
        short_term: SpotifyTrack[];
        medium_term: SpotifyTrack[];
        long_term: SpotifyTrack[];
    }
} = {
    artists: {
        loading: true,
        short_term: [],
        medium_term: [],
        long_term: [],
    },
    tracks: {
        loading: true,
        short_term: [],
        medium_term: [],
        long_term: [],
    },
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileArtistsLoading: (state, action: PayloadAction<boolean>) => {
            state.artists.loading = action.payload;
        },
        setProfileArtists: (state, action: PayloadAction<{
            timeRange: SpotifyTimeRange;
            artists: SpotifyArtist[];
        }>) => {
            state.artists[action.payload.timeRange] = action.payload.artists;
            state.artists.loading = false;
        },

        setProfileTracksLoading: (state, action: PayloadAction<boolean>) => {
            state.tracks.loading = action.payload;
        },
        setProfileTracks: (state, action: PayloadAction<{
            timeRange: SpotifyTimeRange;
            tracks: SpotifyTrack[];
        }>) => {
            state.tracks[action.payload.timeRange] = action.payload.tracks;
            state.tracks.loading = false;
        },
    },
})

export const { 
    setProfileArtistsLoading, 
    setProfileArtists,
    setProfileTracksLoading,
    setProfileTracks,
} = profileSlice.actions;

// Hooks
const selectTimeRange = (_: RootState, timeRange: SpotifyTimeRange) => timeRange;

const selectArtistsObject = (state: RootState) => state.profile.artists;

export const selectProfileArtistsLoading = (state: RootState) => state.profile.artists.loading;
export const selectProfileArtists = createSelector(
    [selectTimeRange, selectArtistsObject],
    (timeRange, artists) => artists[timeRange]
)

export const selectProfileTracksLoading = (state: RootState) => state.profile.tracks.loading;
export const selectProfileTracks = createSelector(
    [selectTimeRange, (state: RootState) => state.profile.tracks],
    (timeRange, tracks) => tracks[timeRange]
)

export default profileSlice.reducer;