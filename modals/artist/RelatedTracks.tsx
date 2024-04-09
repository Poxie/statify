import ArtistModalItemSkeleton from "@/components/skeleton/artist-modal-item";
import SpotifyTrackArtists from "@/components/spotify-track-artists";
import SpotifyTrackImage from "@/components/spotify-track-image";
import SpotifyTrackName from "@/components/spotify-track-name";
import useArtistRelatedTracks from "@/hooks/useArtistRelatedTracks";

const PLACEHOLDER_COUNT = 4;
export default function RelatedTracks({ artistId }: {
    artistId: string;
}) {
    const { relatedTracks, loading } = useArtistRelatedTracks(artistId);

    return(
        <ul className="scrollbar p-2 max-h-[185px] grid gap-2 bg-secondary border-[1px] border-tertiary rounded-md overflow-auto">
            {loading && (
                Array.from(Array(PLACEHOLDER_COUNT)).map((_,key) => (
                    <ArtistModalItemSkeleton key={key} />
                ))
            )}
            {relatedTracks.map(track => {
                const image = track.album.images.at(-1)?.url;
                return(
                    <li 
                        className="group flex gap-2"
                        key={track.id}
                    >
                        <SpotifyTrackImage 
                            height={64}
                            width={64}
                            src={image}
                            track={track}
                            imageClassName="w-9"
                        />
                        <div className="grid">
                            <SpotifyTrackName 
                                track={track}
                                className="text-sm"
                            />
                            <SpotifyTrackArtists 
                                artists={track.artists}
                                className="text-xs"
                            />
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}