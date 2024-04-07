
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";
import { SpotifyArtist, SpotifyTimeRange } from "@/types";

const initialState: {
    artists: {
        loading: boolean;
        short_term: SpotifyArtist[];
        medium_term: SpotifyArtist[];
        long_term: SpotifyArtist[];
    };
} = {
    artists: {
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
    },
})

export const { setProfileArtistsLoading, setProfileArtists } = profileSlice.actions;

// Hooks
const selectTimeRange = (_: RootState, timeRange: SpotifyTimeRange) => timeRange;

const selectArtistsObject = (state: RootState) => state.profile.artists;

export const selectProfileArtistsLoading = (state: RootState) => state.profile.artists.loading;
export const selectProfileArtists = createSelector(
    [selectTimeRange, selectArtistsObject],
    (timeRange, artists) => artists[timeRange]
)

export default profileSlice.reducer;