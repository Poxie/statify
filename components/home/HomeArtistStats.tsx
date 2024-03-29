import { SpotifyAlbum, SpotifyArtist, SpotifyFeaturedAlbum, SpotifyTrack } from "@/types"
import ItemList from "../item-list";
import HomeRelatedArtists from "./HomeRelatedArtists";
import HomeRelatedTracks from "./HomeRelatedTracks";
import { getTopAlbumFromTracks } from "@/utils";

export default function HomeArtistStats({ albums, tracks, artist, featured, relatedArtists, relatedTracks, loading }: {
    tracks: SpotifyTrack[] | undefined;
    albums: SpotifyAlbum[] | undefined;
    artist: SpotifyArtist | undefined;
    featured: SpotifyFeaturedAlbum[] | undefined;
    relatedArtists: SpotifyArtist[] | undefined;
    relatedTracks: SpotifyTrack[] | undefined;
    loading: boolean;
}) {
    const firstFeatured = featured?.at(0);
    const firstTrack = tracks?.at(0);
    const firstAlbum = getTopAlbumFromTracks(tracks, albums);
    return(
        <div className="py-8 w-main max-w-main mx-auto flex flex-col gap-3">
            <div className="max-w-full flex flex-col gap-3 grid-col-1 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                <ItemList 
                    artist={artist}
                    firstItem={firstTrack}
                    items={tracks}
                    type={'track'}
                    loading={loading}
                    index={0}
                />
                <ItemList 
                    artist={artist}
                    firstItem={firstAlbum}
                    items={albums}
                    type={'album'}
                    loading={loading}
                    index={1}
                />
                <ItemList 
                    artist={artist}
                    firstItem={firstFeatured}
                    items={featured}
                    type={'featured'}
                    loading={loading}
                    className="sm:col-span-2 lg:col-span-1"
                    index={2}
                />
            </div>
            <HomeRelatedArtists 
                artist={artist}
                relatedArtists={relatedArtists}
                loading={loading}
            />
            <HomeRelatedTracks 
                artist={artist}
                relatedTracks={relatedTracks}
                loading={loading}
            />
        </div>
    )
}