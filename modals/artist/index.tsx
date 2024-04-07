import { SpotifyArtist } from "@/types";
import ModalHeader from "../ModalHeader";
import Artist from "@/components/artist";
import { POPULARITY_THRESHOLD } from "@/utils/constants";

export default function ArtistModal({ artist }: {
    artist: SpotifyArtist;
}) {
    return(
        <>
            <ModalHeader className="pb-2">
                About the artist
            </ModalHeader>
            <div className="p-4 pt-0">
                <Artist 
                    artist={artist}
                    isPopular={artist.popularity > POPULARITY_THRESHOLD}
                />
            </div>
        </>
    )
}