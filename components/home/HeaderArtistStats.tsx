import { SpotifyAlbum, SpotifyArtist, SpotifyFeaturedAlbum, SpotifyTrack } from "@/types"
import Artist from "../artist";
import { POPULARITY_THRESHOLD } from "@/utils/constants";
import ItemList from "../item-list";
import ItemContainer from "../item-container";

const RELATED_PLACEHOLDER_COUNT = 9;
export default function HeaderArtistStats({ albums, tracks, artist, featured, related, opacityZero }: {
    tracks: SpotifyTrack[] | undefined;
    albums: SpotifyAlbum[] | undefined;
    artist: SpotifyArtist | undefined;
    featured: SpotifyFeaturedAlbum[] | undefined;
    related: SpotifyArtist[] | undefined;
    opacityZero: boolean;
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
        firstAlbum = topTrackAlbums.find(album => album.id === firstAlbumId);
    }
    
    return(
        <div className="grid gap-3 w-main max-w-main mx-auto py-8">
            <div className="grid grid-cols-3 gap-3">
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
                    index={2}
                />
            </div>
            <ItemContainer
                title={`Artists related to ${artist?.name}`}
                emptyLabel={'This artist does not have enough data to show related artists.'}
                isEmpty={!related?.length}
                loading={!related}
                style={opacityZero ? { 
                    transition: 'opacity .5s, transform .5s',
                    transform: `translateY(20px)`,
                    opacity: 0,
                } : {
                    transitionDelay: '.6s',
                    transition: 'opacity .5s, transform .5s',
                    transform: `translateY(0)`,
                    opacity: 1,
                }}
            >
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(related || Array.from(Array(RELATED_PLACEHOLDER_COUNT))).slice(0,9).map(artist => (
                        <Artist 
                            isPopular={artist?.popularity > POPULARITY_THRESHOLD}
                            artist={artist}
                            small
                        />
                    ))}
                </div>
            </ItemContainer>
        </div>
    )
}