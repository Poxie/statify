import { selectProfileArtists, selectProfileArtistsLoading, setProfileArtists, setProfileArtistsLoading } from "@/redux/slices/profile";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { SpotifyArtist, SpotifyTimeRange } from "@/types";
import { getWithToken } from "@/utils";
import { useEffect, useState } from "react";

export default function useProfileArtists({ timeRange: _timeRange }: {
    timeRange: SpotifyTimeRange;
}) {
    const [timeRange, setTimeRange] = useState(_timeRange);

    const dispatch = useAppDispatch();

    const loading = useAppSelector(state => selectProfileArtistsLoading(state, timeRange));
    const artists = useAppSelector(state => selectProfileArtists(state, timeRange));

    useEffect(() => {
        if(artists.length) return;

        dispatch(setProfileArtistsLoading(timeRange));
        getWithToken<SpotifyArtist[]>(`/profile/me/artists?time_range=${timeRange}`)
            .then(artists => {
                dispatch(setProfileArtists({
                    artists,
                    timeRange,
                }));
            })
    }, [artists]);

    return { loading, artists, timeRange, setTimeRange };
}