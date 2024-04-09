import { selectArtistTopAlbums, setArtistTopAlbums } from "@/redux/slices/artists";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { SpotifyAlbum } from "@/types";
import { get } from "@/utils";
import { useEffect } from "react";

export default function useArtistTopAlbums(artistId: string) {
    const dispatch = useAppDispatch();
    const topAlbums = useAppSelector((state: RootState) => selectArtistTopAlbums(state, artistId));

    useEffect(() => {
        if(topAlbums) return;

        get<SpotifyAlbum[]>(`/artist/${artistId}/albums`)
            .then(albums => {
                dispatch(setArtistTopAlbums({ artistId, topAlbums: albums }));
            })
    }, [artistId, topAlbums]);

    return { 
        topAlbums: topAlbums || [], 
        loading: !topAlbums,
    };
}