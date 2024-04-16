import useProfileGenres from "@/hooks/useProfileGenres";
import ModalHeader from "../ModalHeader";
import { SpotifyArtist, SpotifyTimeRange } from "@/types";
import ModalSectionHeader from "../ModalSectionHeader";
import Artist from "@/components/artist";
import SpotifyImage from "@/components/spotify-image";
import { HasTooltip } from "@/contexts/tooltip/HasTooltip";
import ArtistModal from "../artist";
import { useModal } from "@/contexts/modal";
import Carousel from "@/components/carousel";
import ArtistGroup from "./ArtistGroup";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";

const ARTISTS_PER_CHUNK = 4;
const SMALL_SCREEN_ARTISTS_PER_CHUNK = 3;
export default function GenreModal({ genre, timeRange }: {
    genre: string;
    timeRange: SpotifyTimeRange;
}) {
    const { openModal } = useModal();
    const isSmallScreen = useIsSmallScreen();

    const { getArtistsByGenre } = useProfileGenres({ timeRange });

    const openArtistModal = (artist: SpotifyArtist) => {
        openModal(
            <ArtistModal artist={artist} />
        );
    }

    const artists = getArtistsByGenre(genre);

    const artistItems = artists.map((artist, index) => {
        return(
            <ArtistGroup 
                key={artist.id}
                artist={artist}
            />
        )
    });
    return(
        <>
            <ModalHeader>
                What artists is this genre from?
            </ModalHeader>
            <Carousel 
                items={artistItems}
                className="m-4 mt-0 rounded-md"
                itemsPerPage={isSmallScreen ? SMALL_SCREEN_ARTISTS_PER_CHUNK : ARTISTS_PER_CHUNK}
            />
        </>
    )
}