import { selectArtistFeaturedAlbums, setArtistFeaturedAlbums } from "@/redux/slices/artists";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { SpotifyFeaturedAlbum } from "@/types";
import { get } from "@/utils";
import { useEffect } from "react";

export default function useArtistFeaturedAlbums(artistId: string) {
    const dispatch = useAppDispatch();
    const featuredAlbums = useAppSelector((state: RootState) => selectArtistFeaturedAlbums(state, artistId));

    useEffect(() => {
        if(featuredAlbums) return;

        get<SpotifyFeaturedAlbum[]>(`/artist/${artistId}/featured`)
            .then(albums => {
                dispatch(setArtistFeaturedAlbums({ artistId, featuredAlbums: albums }));
            })
    }, [artistId, featuredAlbums]);

    return { 
        featuredAlbums: featuredAlbums || [], 
        loading: !featuredAlbums,
    };
}