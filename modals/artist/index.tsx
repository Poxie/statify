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
import RelatedTracks from "./RelatedTracks";

const SELECTABLE_TABS = [
    { id: 'TOP_TRACKS', text: 'Top songs' },
    { id: 'ALBUMS', text: 'Albums' },
    { id: 'FEATURED_ALBUMS', text: 'Featured' },
    { id: 'RELATED_ARTISTS', text: 'Similar artists' },
    { id: 'RELATED_TRACKS', text: 'You might like' },
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
            <div>
                <div className="p-4 pt-0 border-b-[1px] border-b-secondary">
                    <Artist 
                        artist={artist}
                        isPopular={artist.popularity > POPULARITY_THRESHOLD}
                    />
                </div>
                <TabSelector 
                    items={SELECTABLE_TABS}
                    selectedItemId={selectedTab}
                    onSelect={setSelectedTab}
                    className="p-4 pb-2"
                />
                <div className="p-4 pt-0">
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
                    {selectedTab === 'RELATED_TRACKS' && (
                        <RelatedTracks artistId={artist.id} />
                    )}
                </div>
            </div>
        </>
    )
}