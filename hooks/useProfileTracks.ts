import { selectProfileTracks, setProfileTracksLoading, setProfileTracks, selectProfileTracksLoading } from "@/redux/slices/profile";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { SpotifyTimeRange, SpotifyTrack } from "@/types";
import { getWithToken } from "@/utils";
import { useEffect } from "react";

export default function useProfileTracks({ timeRange='medium_term' }: {
    timeRange: SpotifyTimeRange;
}) {
    const dispatch = useAppDispatch();

    const loading = useAppSelector(selectProfileTracksLoading);
    const tracks = useAppSelector(state => selectProfileTracks(state, timeRange));

    useEffect(() => {
        if(tracks.length) return;

        dispatch(setProfileTracksLoading(true));
        getWithToken<SpotifyTrack[]>(`/profile/me/tracks?time_range=${timeRange}`)
            .then(tracks => {
                dispatch(setProfileTracks({
                    tracks,
                    timeRange,
                }));
            })
    }, [tracks]);

    return { loading, tracks };
}