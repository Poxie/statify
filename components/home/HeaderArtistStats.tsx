import { SpotifyAlbum, SpotifyArtist, SpotifyFeaturedAlbum, SpotifyTrack } from "@/types"
import Image from "next/image";
import Link from "next/link";
import Artist from "../artist";
import { POPULARITY_THRESHOLD } from "@/utils/constants";
import ItemList from "../item-list";
import ItemContainer from "../item-container";

export default function HeaderArtistStats({ albums, tracks, artist, featured, related }: {
    tracks: SpotifyTrack[] | undefined;
    albums: SpotifyAlbum[] | undefined;
    artist: SpotifyArtist | undefined;
    featured: SpotifyFeaturedAlbum[] | undefined;
    related: SpotifyArtist[] | undefined;
}) {
    const firstFeatured = featured?.at(0);
    const firstTrack = tracks?.at(0);

    let firstAlbum = albums?.at(0);
    if(tracks?.length) {
        const topTrackAlbums = tracks.map(track => track.album);
        const topTrackAlbumIds = topTrackAlbums.map(album => album.id);
        const firstAlbumId = (
            topTrackAlbumIds
                .sort((a,b) => (
                    topTrackAlbumIds.filter(i => i === a).length -
                    topTrackAlbumIds.filter(i => i === b).length
                )
        ).pop());
        const firstAlbum = topTrackAlbums.find(album => album.id === firstAlbumId);
    }
    
    return(
        <div className="grid gap-3 w-main max-w-main mx-auto py-8">
            <div className="grid grid-cols-3 gap-3">
                <ItemList 
                    artist={artist}
                    firstItem={firstTrack}
                    items={tracks}
                    type={'track'}
                />
                <ItemList 
                    artist={artist}
                    firstItem={firstAlbum}
                    items={albums}
                    type={'album'}
                />
                <ItemList 
                    artist={artist}
                    firstItem={firstFeatured}
                    items={featured}
                    type={'featured'}
                />
            </div>
            <ItemContainer
                title={`Artists related to ${artist?.name}`}
                emptyLabel={'This artist does not have enough data to show related artists.'}
                isEmpty={!related?.length}
            >
                {related!?.length && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {related?.slice(0,9).map(artist => (
                            <Artist 
                                isPopular={artist.popularity > POPULARITY_THRESHOLD}
                                artist={artist}
                                small
                            />
                        ))}
                    </div>
                )}
            </ItemContainer>
        </div>
    )
}