import { SpotifyAlbum, SpotifyArtist, SpotifyTrack } from "@/types"
import Image from "next/image";

export default function HeaderArtistStats({ albums, tracks, artist }: {
    tracks: SpotifyTrack[] | undefined;
    albums: SpotifyAlbum[] | undefined;
    artist: SpotifyArtist | undefined;
}) {
    if(!tracks?.length || !albums?.length) return null;
    
    const firstTrack = tracks[0];

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
    
    return(
        <div className="py-8 grid grid-cols-3 gap-3 w-main max-w-full mx-auto">
            <div className="flex flex-col rounded-lg p-4 pb-0 pr-0 border-[1px] border-tertiary h-[242px]">
                <span className="block text-xs text-secondary mb-3">
                    {artist?.name}'s most popular songs
                </span>
                <div className="flex-1 scrollbar overflow-y-scroll pr-2 pb-4">
                    <div className="flex gap-3">
                        <Image 
                            className="w-16 aspect-square rounded object-cover"
                            src={firstTrack.album.images.at(-1)?.url as string}
                            width={100}
                            height={100}
                            alt=""
                        />
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm">
                                {firstTrack.name}
                            </span>
                            <span className="text-xs text-secondary">
                                Current popularity {firstTrack.popularity}
                            </span>
                        </div>
                    </div>
                    <ul className="grid pt-3 gap-1.5">
                        {tracks.slice(1).map((track, key) => (
                            <li className="flex items-center">
                                <span className="w-5 text-sm">
                                    {key + 2}
                                </span>
                                <div className="flex-1 flex gap-3 items-center justify-between">
                                    <div className="flex gap-2 items-center">
                                        <Image 
                                            className="w-6 aspect-square rounded object-cover"
                                            src={track.album.images.at(-1)?.url as string}
                                            width={32}
                                            height={32}
                                            alt=""
                                        />
                                        <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                                            {track.name}
                                        </span>
                                    </div>
                                    <span className="text-xs text-secondary whitespace-nowrap">
                                        Popularity {track.popularity}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col rounded-lg p-4 pb-0 pr-0 border-[1px] border-tertiary h-[242px]">
                <span className="block text-xs text-secondary mb-3">
                    {artist?.name}'s albums
                </span>
                <div className="flex-1 scrollbar overflow-y-scroll pr-2 pb-4">
                    <div className="flex gap-3">
                        <Image 
                            className="w-16 aspect-square rounded object-cover"
                            src={firstAlbum?.images.at(-1)?.url as string}
                            width={100}
                            height={100}
                            alt=""
                        />
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm">
                                {firstAlbum?.name}
                            </span>
                            <span className="text-xs text-secondary">
                                Most popular album
                            </span>
                        </div>
                    </div>
                    <ul className="grid pt-3 gap-1.5">
                        {albums.slice(1).map((album, key) => (
                            <li className="flex items-center">
                                <div className="flex-1 flex gap-3 items-center justify-between">
                                    <div className="flex gap-2 items-center">
                                        <Image 
                                            className="w-6 aspect-square rounded object-cover"
                                            src={album.images.at(-1)?.url as string}
                                            width={32}
                                            height={32}
                                            alt=""
                                        />
                                        <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                                            {album.name}
                                        </span>
                                    </div>
                                    <span className="text-xs text-secondary whitespace-nowrap">
                                        {album.release_date}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}