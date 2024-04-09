import { selectArtistRelatedArtists, setArtistRelatedArtists } from "@/redux/slices/artists";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { SpotifyArtist } from "@/types";
import { get } from "@/utils";
import { useEffect } from "react";

export default function useArtistRelatedArtists(artistId: string) {
    const dispatch = useAppDispatch();
    const relatedArtists = useAppSelector((state: RootState) => selectArtistRelatedArtists(state, artistId));

    useEffect(() => {
        if(relatedArtists) return;

        get<SpotifyArtist[]>(`/artist/${artistId}/related`)
            .then(artists => {
                dispatch(setArtistRelatedArtists({ artistId, relatedArtists: artists }));
            })
    }, [artistId, relatedArtists]);

    return { 
        relatedArtists: relatedArtists || [], 
        loading: !relatedArtists,
    };
}