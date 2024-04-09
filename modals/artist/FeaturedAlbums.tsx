import ArtistModalItemSkeleton from "@/components/skeleton/artist-modal-item";
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
                    <ArtistModalItemSkeleton key={key} />
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