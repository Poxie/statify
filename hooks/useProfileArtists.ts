import { selectProfileArtists, selectProfileArtistsLoading, setProfileArtists, setProfileArtistsLoading } from "@/redux/slices/profile";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { SpotifyArtist, SpotifyTimeRange } from "@/types";
import { getWithToken } from "@/utils";
import { useEffect } from "react";

export default function useProfileArtists({ timeRange='medium_term' }: {
    timeRange: SpotifyTimeRange;
}) {
    const dispatch = useAppDispatch();

    const loading = useAppSelector(selectProfileArtistsLoading);
    const artists = useAppSelector(state => selectProfileArtists(state, timeRange));

    useEffect(() => {
        if(artists.length) return;

        dispatch(setProfileArtistsLoading(true));
        getWithToken<SpotifyArtist[]>(`/profile/me/artists?time_range=${timeRange}`)
            .then(artists => {
                dispatch(setProfileArtists({
                    artists,
                    timeRange,
                }));
            })
    }, [artists]);

    return { loading, artists };
}