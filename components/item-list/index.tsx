import { SpotifyAlbum, SpotifyArtist, SpotifyFeaturedAlbum, SpotifyTrack } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ItemContainer from "../item-container";
import { useRef } from "react";
import { useAnimateStyle } from "@/hooks/useAnimateStyle";
import { QuestionIcon } from "@/assets/icons/QuestionIcon";
import { HasTooltip } from "@/contexts/tooltip/HasTooltip";
import SpotifyImage from "../spotify-image";

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
const getTooltipExplanation = (type: ListType) => {
    if(type === 'track') return 'Popularity is based on how much engagement and how many streams it receives compared to other songs.';
    if(type === 'album') return 'Many of this artist\'s top songs came from this album.';
    return 'There is no special reason for this album to be featured, it just is.'
}

export default function ItemList({ artist, firstItem, items, type, index, loading, className='', opacityZero }: {
    artist?: SpotifyArtist;
    firstItem?: ListItem;
    items?: ListItem[];
    type: ListType;
    index: number;
    loading?: boolean;
    className?: string;
    opacityZero: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useAnimateStyle(ref, opacityZero, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delayIn: 200 + index * 100,
    })
    return(
        <ItemContainer
            title={getListTitle(artist, type)}
            isEmpty={!firstItem || !items?.length}
            emptyLabel={getEmptyText(type)}
            className={`pb-0 pr-0 h-[242px] ${className}`}
            loading={loading}
            ref={ref}
        >
            {firstItem && items?.length && (
                <div className="flex-1 scrollbar overflow-y-scroll pr-2 pb-4">
                    <div className="flex gap-3">
                        <SpotifyImage
                            className="w-16" 
                            src={getItemImage(firstItem, type)}
                            width={100}
                            height={100}
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
                            <span className="text-xs text-secondary flex items-center gap-1.5">
                                {getFirstItemText(firstItem, type)}

                                <HasTooltip 
                                    tooltip={getTooltipExplanation(type)}
                                    delay={250}
                                >
                                    <QuestionIcon className="w-3" />
                                </HasTooltip>
                            </span>
                        </div>
                    </div>
                    <ul className="flex flex-col pt-3 gap-1.5">
                        {items.slice(1).map((item, key) => (
                            <li 
                                className="flex items-center gap-2"
                                key={item.id}
                            >
                                {type === 'track' && (
                                    <span className="w-3.5 text-sm">
                                        {key + 2}
                                    </span>
                                )}
                                <SpotifyImage 
                                    className="w-6 rounded-sm"
                                    src={getItemImage(item, type)}
                                    height={32}
                                    width={32}
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