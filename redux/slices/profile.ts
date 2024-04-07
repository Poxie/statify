import { ArtistInfo } from "@/hooks/useArtistInfo";
import { createSlice } from "@reduxjs/toolkit"

const initialState: {
    artists: ArtistInfo[];
} = {
    artists: [],
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setArtists: (state, action) => {
            state.artists = action.payload;
        },
    },
})

export const { setArtists } = profileSlice.actions;

export default profileSlice.reducer;