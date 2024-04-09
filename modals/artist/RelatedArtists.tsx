import SpotifyImage from "@/components/spotify-image";
import { useModal } from "@/contexts/modal";
import useArtistRelatedArtists from "@/hooks/useArtistRelatedArtists";
import ArtistModal from ".";

const PLACEHOLDER_COUNT = 4;
export default function RelatedArtists({ artistId }: {
    artistId: string;
}) {
    const { openModal } = useModal();

    const { relatedArtists, loading } = useArtistRelatedArtists(artistId);
    
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
            {relatedArtists.map(artist => {
                const onClick = () => openModal(<ArtistModal artist={artist} />);
                const image = artist.images.at(-1)?.url;
                return(
                    <li 
                        className="group flex gap-2"
                        key={artist.id}
                    >
                        <button 
                            onClick={onClick}
                            aria-label={`View ${artist.name} profile`}
                        >
                            <SpotifyImage 
                                height={64}
                                width={64}
                                src={image}
                                className="w-9"
                            />
                        </button>
                        <div className="grid">
                            <button 
                                className="text-left text-sm font-medium"
                                onClick={onClick}
                            >
                                {artist.name}
                            </button>
                            <span className="text-xs text-secondary">
                                {artist.followers.total.toLocaleString()} followers
                            </span>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}