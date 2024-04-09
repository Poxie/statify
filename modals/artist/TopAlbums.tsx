import ArtistModalItemSkeleton from "@/components/skeleton/artist-modal-item";
import SpotifyImage from "@/components/spotify-image";
import useArtistTopAlbums from "@/hooks/useArtistTopAlbums";

const PLACEHOLDER_COUNT = 4;
export default function TopAlbums({ artistId }: {
    artistId: string;
}) {
    const { topAlbums, loading } = useArtistTopAlbums(artistId);
    
    return(
        <ul className="scrollbar p-2 max-h-[185px] grid gap-2 bg-secondary border-[1px] border-tertiary rounded-md overflow-auto">
            {loading && (
                Array.from(Array(PLACEHOLDER_COUNT)).map((_,key) => (
                    <ArtistModalItemSkeleton key={key} />
                ))
            )}
            {topAlbums.map(album => {
                const image = album.images.at(-1)?.url;
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
                            <span className="text-xs text-secondary">
                                {album.release_date}
                            </span>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}