import { selectArtistTopTracks, setArtistTopTracks } from "@/redux/slices/artists";
import { RootState } from "@/redux/store";
import { SpotifyTrack } from "@/types";
import { get } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useArtistTopTracks = (artistId: string) => {
    const dispatch = useDispatch();
    const topTracks = useSelector((state: RootState) => selectArtistTopTracks(state, artistId));

    useEffect(() => {
        if(topTracks) return;

        get<SpotifyTrack[]>(`/artist/${artistId}/tracks`)
            .then(tracks => {
                dispatch(setArtistTopTracks({ artistId, topTracks: tracks }));
            })
    }, [artistId, topTracks]);

    return { 
        topTracks: topTracks || [], 
        loading: !topTracks,
    }
}