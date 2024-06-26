import { SpotifyTimeRange } from "@/types";
import useProfileArtists from "./useProfileArtists";
import { useState } from "react";

export default function useProfileGenres({ timeRange }: {
    timeRange: SpotifyTimeRange;
}) {
    const artists = useProfileArtists({ timeRange });

    const allGenres = artists.artists.flatMap(artist => artist.genres);
    const genresByCount = allGenres.reduce((acc, genre) => {
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const getArtistsByGenre = (genre: string) => {
        return artists.artists.filter(artist => artist.genres.includes(genre));
    }

    return { 
        loading: artists.loading, 
        genres: allGenres,
        genresByCount,
        timeRange: artists.timeRange,
        setTimeRange: artists.setTimeRange,
        getArtistsByGenre,
    };
}