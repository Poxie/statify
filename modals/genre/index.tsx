import useProfileGenres from "@/hooks/useProfileGenres";
import ModalHeader from "../ModalHeader";
import { SpotifyArtist, SpotifyTimeRange } from "@/types";
import ModalSectionHeader from "../ModalSectionHeader";
import Artist from "@/components/artist";
import SpotifyImage from "@/components/spotify-image";
import { HasTooltip } from "@/contexts/tooltip/HasTooltip";
import ArtistModal from "../artist";
import { useModal } from "@/contexts/modal";

export default function GenreModal({ genre, timeRange }: {
    genre: string;
    timeRange: SpotifyTimeRange;
}) {
    const { openModal } = useModal();

    const { getArtistsByGenre } = useProfileGenres({ timeRange });

    const openArtistModal = (artist: SpotifyArtist) => {
        openModal(
            <ArtistModal artist={artist} />
        );
    }

    const artists = getArtistsByGenre(genre);
    return(
        <>
            <ModalHeader>
                What artists is this genre from?
            </ModalHeader>
            <div className="p-4 pt-0">
                <ModalSectionHeader 
                    text={`Your ${genre} artists (${artists.length})`}
                    className="mb-2"
                />
                <ul className="grid grid-cols-6 sm:grid-cols-10 gap-1">
                    {artists.map(artist => {
                        const image = artist.images.at(-1)?.url;
                        return(
                            <li key={artist.id}>
                                <HasTooltip
                                    tooltip={artist.name}
                                    onClick={() => openArtistModal(artist)}
                                    className="block"
                                >
                                    <SpotifyImage 
                                        height={128}
                                        width={128}
                                        src={image}
                                    />
                                </HasTooltip>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}