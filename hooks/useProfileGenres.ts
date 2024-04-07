import { SpotifyTimeRange } from "@/types";
import useProfileArtists from "./useProfileArtists";

export default function useProfileGenres({ timeRange='medium_term' }: {
    timeRange: SpotifyTimeRange;
}) {
    const artists = useProfileArtists({ timeRange });

    const allGenres = artists.artists.flatMap(artist => artist.genres);
    const genresByCount = allGenres.reduce((acc, genre) => {
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return { 
        loading: artists.loading, 
        genres: allGenres,
        genresByCount,
    };
}