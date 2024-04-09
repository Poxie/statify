
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";
import { SpotifyArtist, SpotifyTimeRange, SpotifyTrack } from "@/types";

const initialState: {
    artists: {
        loading: null | SpotifyTimeRange;
        short_term: SpotifyArtist[];
        medium_term: SpotifyArtist[];
        long_term: SpotifyArtist[];
    };
    tracks: {
        loading: null | SpotifyTimeRange;
        short_term: SpotifyTrack[];
        medium_term: SpotifyTrack[];
        long_term: SpotifyTrack[];
    }
} = {
    artists: {
        loading: 'medium_term',
        short_term: [],
        medium_term: [],
        long_term: [],
    },
    tracks: {
        loading: 'medium_term',
        short_term: [],
        medium_term: [],
        long_term: [],
    },
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileArtistsLoading: (state, action: PayloadAction<SpotifyTimeRange>) => {
            state.artists.loading = action.payload;
        },
        setProfileArtists: (state, action: PayloadAction<{
            timeRange: SpotifyTimeRange;
            artists: SpotifyArtist[];
        }>) => {
            state.artists[action.payload.timeRange] = action.payload.artists;
            state.artists.loading = null;
        },

        setProfileTracksLoading: (state, action: PayloadAction<SpotifyTimeRange>) => {
            state.tracks.loading = action.payload;
        },
        setProfileTracks: (state, action: PayloadAction<{
            timeRange: SpotifyTimeRange;
            tracks: SpotifyTrack[];
        }>) => {
            state.tracks[action.payload.timeRange] = action.payload.tracks;
            state.tracks.loading = null;
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
const selectTracksObject = (state: RootState) => state.profile.tracks;

export const selectProfileArtistsLoading = createSelector(
    [selectTimeRange, selectArtistsObject],
    (timeRange, artists) => artists.loading === timeRange
)
export const selectProfileArtists = createSelector(
    [selectTimeRange, selectArtistsObject],
    (timeRange, artists) => artists[timeRange]
)

export const selectProfileTracksLoading = createSelector(
    [selectTimeRange, selectTracksObject],
    (timeRange, tracks) => tracks.loading === timeRange
)
export const selectProfileTracks = createSelector(
    [selectTimeRange, selectTracksObject],
    (timeRange, tracks) => tracks[timeRange]
)

export default profileSlice.reducer;