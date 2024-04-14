import SpotifyImage from "@/components/spotify-image";
import { useModal } from "@/contexts/modal";
import { SpotifyArtist } from "@/types";
import ArtistModal from "../artist";

export default function ArtistGroup({ artist }: {
    artist: SpotifyArtist;
}) {
    const { openModal } = useModal();

    const openArtistModal = () => {
        openModal(
            <ArtistModal artist={artist} />
        );
    }

    const image = artist.images.at(-2)?.url;
    return(
        <button onClick={openArtistModal}>
            <SpotifyImage 
                height={128}
                width={128}
                src={image}
            />
            <span className="block text-center text-xs mt-1 whitespace-nowrap text-ellipsis overflow-hidden">
                {artist.name}
            </span>
        </button>
    )
}