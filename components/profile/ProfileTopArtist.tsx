import { SpotifyArtist } from "@/types";
import SpotifyImage from "../spotify-image";
import Link from "next/link";
import { useModal } from "@/contexts/modal";
import ArtistModal from "@/modals/artist";

export default function ProfileTopArtist({ artist }: {
    artist: SpotifyArtist;
}) {
    const { openModal } = useModal(); 

    const openArtistModal = () => {
        openModal(<ArtistModal artist={artist} />);
    }

    const image = artist.images.at(-1)?.url;
    return(
        <div className="flex gap-2">
            <button 
                aria-label={artist.name}
                onClick={openArtistModal}
            >
                <SpotifyImage 
                    height={120}
                    width={120}
                    src={image}
                    className="w-24"
                />
            </button>
            <div className="flex flex-col">
                <button 
                    className="text-left text-lg md:text-xl font-semibold hover:text-c-primary transition-colors"
                    onClick={openArtistModal}
                >
                    {artist.name}
                </button>
                <span className="text-xs text-secondary">
                    {artist.followers.total.toLocaleString()} followers
                </span>
            </div>
        </div>
    )
}