import { SpotifyArtist } from "@/types";
import ModalHeader from "../ModalHeader";
import Artist from "@/components/artist";
import { POPULARITY_THRESHOLD } from "@/utils/constants";
import TopTracks from "./TopTracks";

export default function ArtistModal({ artist }: {
    artist: SpotifyArtist;
}) {
    return(
        <>
            <ModalHeader className="pb-2">
                About the artist
            </ModalHeader>
            <div className="p-4 pt-0">
                <div className="mb-4 pb-4 border-b-[1px] border-b-secondary">
                    <Artist 
                        artist={artist}
                        isPopular={artist.popularity > POPULARITY_THRESHOLD}
                    />
                </div>
                <TopTracks artistId={artist.id} />
            </div>
        </>
    )
}