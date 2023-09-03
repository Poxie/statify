import { SpotifyAlbum, SpotifyArtist, SpotifyFeaturedAlbum, SpotifyTrack } from "@/types"
import Artist from "../artist";
import { POPULARITY_THRESHOLD } from "@/utils/constants";
import ItemList from "../item-list";
import ItemContainer from "../item-container";
import { useRef } from "react";
import { useAnimateStyle } from "@/hooks/useAnimateStyle";

const RELATED_PLACEHOLDER_COUNT = 9;
export default function HeaderArtistStats({ albums, tracks, artist, featured, related, opacityZero }: {
    tracks: SpotifyTrack[] | undefined;
    albums: SpotifyAlbum[] | undefined;
    artist: SpotifyArtist | undefined;
    featured: SpotifyFeaturedAlbum[] | undefined;
    related: SpotifyArtist[] | undefined;
    opacityZero: boolean;
}) {
    const relatedArtists = useRef<HTMLDivElement>(null);

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
        firstAlbum = topTrackAlbums.find(album => album.id === firstAlbumId);
    }
    
    useAnimateStyle(relatedArtists, opacityZero, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delayIn: 500,
    })
    return(
        <div className="flex flex-col gap-3 w-main max-w-main mx-auto py-8">
            <div className="flex flex-col sm:grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-full">
                <ItemList 
                    artist={artist}
                    firstItem={firstTrack}
                    items={tracks}
                    type={'track'}
                    loading={!tracks}
                    opacityZero={opacityZero}
                    index={0}
                />
                <ItemList 
                    artist={artist}
                    firstItem={firstAlbum}
                    items={albums}
                    type={'album'}
                    loading={!albums}
                    opacityZero={opacityZero}
                    index={1}
                />
                <ItemList 
                    artist={artist}
                    firstItem={firstFeatured}
                    items={featured}
                    type={'featured'}
                    loading={!featured}
                    opacityZero={opacityZero}
                    className="sm:col-span-2 lg:col-span-1"
                    index={2}
                />
            </div>
            <ItemContainer
                title={artist ? `Artists related to ${artist?.name}` : undefined}
                emptyLabel={'This artist does not have enough data to show related artists.'}
                isEmpty={!related?.length}
                loading={!related}
                ref={relatedArtists}
            >
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(related || Array.from(Array(RELATED_PLACEHOLDER_COUNT))).slice(0,9).map((artist, key) => (
                        <Artist 
                            isPopular={artist?.popularity > POPULARITY_THRESHOLD}
                            artist={artist}
                            small
                            key={key}
                        />
                    ))}
                </div>
            </ItemContainer>
        </div>
    )
}