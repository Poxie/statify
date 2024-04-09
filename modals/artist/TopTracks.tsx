import SpotifyTrackArtists from "@/components/spotify-track-artists";
import SpotifyTrackImage from "@/components/spotify-track-image";
import SpotifyTrackName from "@/components/spotify-track-name";
import { useArtistTopTracks } from "@/hooks/useArtistTopTracks";
import ModalSectionHeader from "../ModalSectionHeader";

const PLACEHOLDER_COUNT = 4;
export default function TopTracks({ artistId }: {
    artistId: string;
}) {
    const { topTracks, loading } = useArtistTopTracks(artistId);

    return(
        <>
            <ModalSectionHeader 
                text={"Top tracks"}
                className="mb-2"
            />
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
                {topTracks.map(track => {
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
        </>
    )
}