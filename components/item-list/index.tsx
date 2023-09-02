import { SpotifyAlbum, SpotifyArtist, SpotifyFeaturedAlbum, SpotifyTrack } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ItemContainer from "../item-container";

type ListItem = SpotifyTrack | SpotifyAlbum | SpotifyFeaturedAlbum;
type ListType = 'track' | 'album' | 'featured';

const getListTitle = (artist: SpotifyArtist | undefined, type: ListType) => {
    if(!artist) return;
    if(type === 'track') return `${artist.name}'s most popular songs.`;
    if(type === 'album') return `${artist.name}'s albums.`;
    return `${artist.name} can also be found here...`;
}
const getItemImage = (item: ListItem, type: ListType) => {
    if(type === 'track') return (item as SpotifyTrack).album.images.at(-1)?.url;
    if(type === 'album' || type === 'featured') return (item as SpotifyAlbum | SpotifyFeaturedAlbum).images.at(-1)?.url;
}
const getFirstItemText = (item: ListItem, type: ListType) => {
    if(type === 'track') return `Current popularity ${(item as SpotifyTrack).popularity}`;
    if(type === 'album') return 'Most popular album';
    if(type === 'featured') return 'Featured album';
}
const getItemInfoText = (item: ListItem, type: ListType) => {
    if(type === 'track') return `Popularity ${(item as SpotifyTrack).popularity}`;
    if(type === 'album') return (item as SpotifyAlbum).release_date;
    return (item as SpotifyFeaturedAlbum).album_group === 'compilation' ? (
        'Compilation'
    ) : (
        <>
        with{' '}
        <Link
            href={`/?a=${(item as SpotifyFeaturedAlbum).artists.at(0)?.id}`}
            className="transition-colors hover:text-primary"
            scroll={false}
        >
            {(item as SpotifyFeaturedAlbum).artists.at(0)?.name}
        </Link>
        </>
    )
}
const getEmptyText = (type: ListType) => {
    if(type === 'track') return 'This artist has not published any songs.';
    if(type === 'album') return 'This artist has not published any albums.';
    return 'This artist is not featured anywhere.';
}

export default function ItemList({ artist, firstItem, items, type, loading }: {
    artist?: SpotifyArtist;
    firstItem?: ListItem;
    items?: ListItem[];
    type: ListType;
    loading?: boolean;
}) {
    return(
        <ItemContainer
            title={getListTitle(artist, type) as string}
            isEmpty={!firstItem || !items?.length}
            emptyLabel={getEmptyText(type)}
            className={'pb-0 pr-0 h-[242px]'}
            loading={loading}
        >
            {firstItem && items?.length && (
                <div className="flex-1 scrollbar overflow-y-scroll pr-2 pb-4">
                    <div className="flex gap-3">
                        <Image 
                            className="w-16 aspect-square rounded object-cover"
                            src={getItemImage(firstItem, type) as string}
                            width={100}
                            height={100}
                            alt=""
                        />
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm multiline-ellipsis">
                                {firstItem.name}
                            </span>
                            {type === 'featured' && (
                                <span className="text-[10px] text-secondary -mt-1 mb-1">
                                    {getItemInfoText(firstItem, type)}
                                </span>
                            )}
                            <span className="text-xs text-secondary">
                                {getFirstItemText(firstItem, type)}
                            </span>
                        </div>
                    </div>
                    <ul className="flex flex-col pt-3 gap-1.5">
                        {items.slice(1).map((item, key) => (
                            <li className="flex items-center gap-2">
                                {type === 'track' && (
                                    <span className="w-3.5 text-sm">
                                        {key + 2}
                                    </span>
                                )}
                                <Image 
                                    className="w-6 aspect-square rounded object-cover"
                                    src={getItemImage(item, type) as string}
                                    width={32}
                                    height={32}
                                    alt=""
                                />
                                <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis flex-1">
                                    {item.name}
                                </span>
                                <span className="text-xs text-secondary whitespace-nowrap">
                                    {getItemInfoText(item, type)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </ItemContainer>
    )
}