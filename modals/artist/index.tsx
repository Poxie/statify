import { SpotifyArtist } from "@/types";
import ModalHeader from "../ModalHeader";
import Artist from "@/components/artist";
import { POPULARITY_THRESHOLD } from "@/utils/constants";
import TopTracks from "./TopTracks";
import TopAlbums from "./TopAlbums";
import ModalSectionHeader from "../ModalSectionHeader";
import FeaturedAlbums from "./FeaturedAlbums";
import TabSelector from "@/components/tab-selector";
import { useState } from "react";
import RelatedArtists from "./RelatedArtists";

const SELECTABLE_TABS = [
    { id: 'TOP_TRACKS', text: 'Top tracks' },
    { id: 'ALBUMS', text: 'Albums' },
    { id: 'FEATURED_ALBUMS', text: 'Featured albums' },
    { id: 'RELATED_ARTISTS', text: 'Related artists' },
] as const;
export default function ArtistModal({ artist }: {
    artist: SpotifyArtist;
}) {
    const [selectedTab, setSelectedTab] = useState<typeof SELECTABLE_TABS[number]['id']>(SELECTABLE_TABS[0].id);

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
                <TabSelector 
                    items={SELECTABLE_TABS}
                    selectedItemId={selectedTab}
                    onSelect={setSelectedTab}
                    className="mb-2"
                />
                {selectedTab === 'TOP_TRACKS' && (
                    <TopTracks artistId={artist.id} />
                )}
                {selectedTab === 'ALBUMS' && (
                    <TopAlbums artistId={artist.id} />
                )}
                {selectedTab === 'FEATURED_ALBUMS' && (
                    <FeaturedAlbums artistId={artist.id} />
                )}
                {selectedTab === 'RELATED_ARTISTS' && (
                    <RelatedArtists artistId={artist.id} />
                )}
            </div>
        </>
    )
}