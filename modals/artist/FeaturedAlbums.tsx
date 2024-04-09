import SpotifyImage from "@/components/spotify-image";
import SpotifyTrackArtists from "@/components/spotify-track-artists";
import useArtistFeaturedAlbums from "@/hooks/useArtistFeaturedAlbums";

const PLACEHOLDER_COUNT = 4;
export default function FeaturedAlbums({ artistId }: {
    artistId: string;
}) {
    const { featuredAlbums, loading } = useArtistFeaturedAlbums(artistId);

    return(
        <ul className="scrollbar p-2 max-h-[185px] grid gap-2 bg-secondary border-[1px] border-tertiary rounded-md overflow-auto">
            {loading && (
                Array.from(Array(PLACEHOLDER_COUNT)).map((_,key) => (
                    <div 
                        className="flex gap-1"
                        key={key}
                    >
                        <div className="w-9 aspect-square rounded-md bg-tertiary" />
                        <div className="flex flex-col gap-1">
                            <div className="w-24 h-5 bg-tertiary rounded-md" />
                            <div className="w-28 h-3 bg-tertiary rounded-md" />
                        </div>
                    </div>
                ))
            )}
            {featuredAlbums.map(album => {
                const image = album.images.at(-1)?.url;
                const otherArtists = album.artists.filter(artist => artist.id !== artistId);
                return(
                    <li 
                        className="group flex gap-2"
                        key={album.id}
                    >
                        <SpotifyImage 
                            height={64}
                            width={64}
                            src={image}
                            className="w-9"
                        />
                        <div className="grid">
                            <span className="text-sm font-medium">
                                {album.name}
                            </span>
                            <SpotifyTrackArtists 
                                artists={otherArtists}
                            />
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}