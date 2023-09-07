import { SpotifyAlbum, SpotifyArtist, SpotifyFeaturedAlbum, SpotifyTrack } from "@/types"
import Artist from "../artist";
import { POPULARITY_THRESHOLD } from "@/utils/constants";
import ItemList from "../item-list";
import ItemContainer from "../item-container";
import { useRef } from "react";
import { useAnimateStyle } from "@/hooks/useAnimateStyle";
import Track from "../track";
import Link from "next/link";
import { HasTooltip } from "@/contexts/tooltip/HasTooltip";
import { QuestionIcon } from "@/assets/icons/QuestionIcon";

// Determining the artist's top album by checking the most occuring album among their top tracks.
const getTopAlbum = (tracks: SpotifyTrack[] | undefined, albums: SpotifyAlbum[] | undefined) => {
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
    return firstAlbum;
}

const RELATED_ARTIST_COUNT = 9;
const RELATED_TRACK_COUNT = 48;
export default function HeaderArtistStats({ albums, tracks, artist, featured, related, relatedTracks, opacityZero }: {
    tracks: SpotifyTrack[] | undefined;
    albums: SpotifyAlbum[] | undefined;
    artist: SpotifyArtist | undefined;
    featured: SpotifyFeaturedAlbum[] | undefined;
    related: SpotifyArtist[] | undefined;
    relatedTracks: SpotifyTrack[] | undefined;
    opacityZero: boolean;
}) {
    const relatedArtists = useRef<HTMLDivElement>(null);
    const relatedTracksContainer = useRef<HTMLDivElement>(null);

    const firstFeatured = featured?.at(0);
    const firstTrack = tracks?.at(0);
    const firstAlbum = getTopAlbum(tracks, albums);
    
    useAnimateStyle(relatedArtists, opacityZero, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delayIn: 500,
    })
    useAnimateStyle(relatedTracksContainer, opacityZero, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delayIn: 700,
    })
    return(
        <div className="py-8 w-main max-w-main mx-auto flex flex-col gap-3">
            <div className="max-w-full flex flex-col gap-3 grid-col-1 sm:grid sm:grid-cols-2 lg:grid-cols-3">
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
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {(related || Array.from(Array(RELATED_ARTIST_COUNT))).slice(0, RELATED_ARTIST_COUNT).map((artist, key) => (
                        <Artist 
                            isPopular={artist?.popularity > POPULARITY_THRESHOLD}
                            artist={artist}
                            small
                            key={key}
                        />
                    ))}
                </div>
            </ItemContainer>
            <ItemContainer
                className="pr-0"
                title={relatedTracks ? `If you like ${artist?.name}'s songs you may also like...` : ''}
                emptyLabel={'This artist does not have enough data to show similar songs.'}
                isEmpty={!relatedTracks?.length}
                loading={!relatedTracks}
                ref={relatedTracksContainer}
            >
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 max-h-[350px] overflow-auto scrollbar pb-4 pr-4">
                    {(relatedTracks || Array.from(Array(RELATED_TRACK_COUNT))).slice(0, RELATED_TRACK_COUNT).map((track, key) => (
                        <Track 
                            track={track}
                            key={key}
                        />
                    ))}
                </div>
                {relatedTracks ? (
                    <div className="flex justify-between gap-3 text-xs text-secondary pt-4 mr-4 border-t-[1px] border-t-tertiary">
                        <div className="flex items-center gap-2">
                            <span>
                                Navigate to our
                                {' '}
                                <Link
                                    href={`/explore`}
                                    className="transition-colors hover:text-primary"
                                >
                                    exploration section
                                </Link>
                                {' '}
                                for more advanced search options.
                            </span>
                            <HasTooltip tooltip={'These recommendations are based only on the artist and its top four genres. Visit our exploration section for better recommendations.'}>
                                <QuestionIcon className="w-3" />
                            </HasTooltip>
                        </div>
                        <Link 
                            href={'/explore'}
                            className="transition-colors hover:text-primary"
                        >
                            Explore more
                        </Link>
                    </div>
                ) : (
                    <div className="h-[33px]">

                    </div>
                )}
            </ItemContainer>
        </div>
    )
}