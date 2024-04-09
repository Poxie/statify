import { selectArtistRelatedTracks, setArtistRelatedTracks } from "@/redux/slices/artists";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { SpotifyTrack } from "@/types";
import { get } from "@/utils";
import { useEffect } from "react";

export default function useArtistRelatedTracks(artistId: string) {
    const dispatch = useAppDispatch();
    const relatedTracks = useAppSelector((state: RootState) => selectArtistRelatedTracks(state, artistId));

    useEffect(() => {
        if(relatedTracks) return;

        get<SpotifyTrack[]>(`/artist/${artistId}/related-tracks`)
            .then(tracks => {
                dispatch(setArtistRelatedTracks({ artistId, relatedTracks: tracks }));
            })
    }, [artistId, relatedTracks]);

    return { 
        relatedTracks: relatedTracks || [], 
        loading: !relatedTracks,
    };
}