import { SpotifyArtist } from "@/types"
import SpotifyImage from "../spotify-image";
import Link from "next/link";
import ProfileIndexLabel from "./ProfileIndexLabel";
import { useModal } from "@/contexts/modal";
import ArtistModal from "@/modals/artist";

export default function ProfileArtist({ artist, index }: {
    artist: SpotifyArtist;
    index: number;
}) {
    const { openModal } = useModal();

    const openArtistModal = () => {
        openModal(<ArtistModal artist={artist} />);
    }

    const image = artist.images[0]?.url;
    return(
        <div className="group relative">
            <ProfileIndexLabel 
                index={index}
            />
            <button 
                className="w-full block border-2 border-tertiary rounded-lg overflow-hidden"
                aria-label={artist.name}
                onClick={openArtistModal}
            >
                <SpotifyImage 
                    width={250}
                    height={250}
                    src={image}
                    className="aspect-video"
                />
            </button>
            <button
                className="block mt-1 mx-auto text-sm group-hover:text-c-primary transition-colors"
                onClick={openArtistModal}
            >
                {artist.name}
            </button>
        </div>
    )
}