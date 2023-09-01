"use client";
import Artists from '@/assets/json/defaultArtists.json';
import { SpotifyAlbum, SpotifyArtist, SpotifyFeaturedAlbum, SpotifyTrack } from '@/types';
import Artist from '../artist';
import Link from 'next/link';
import { cache, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { get } from '@/utils';
import HeaderArtistStats from './HeaderArtistStats';
import { POPULARITY_THRESHOLD } from '@/utils/constants';

const getRandomArtist = () => {
    return Artists[Math.floor(Math.random() * Artists.length)].id;
}

export default function HomeArtistInfo() {
    const artistId = useSearchParams().get('a');

    const [artistInfo, setArtistInfo] = useState<null | {
        artist: SpotifyArtist;
        tracks: SpotifyTrack[];
        albums: SpotifyAlbum[];
        featured: SpotifyFeaturedAlbum[];
        related: SpotifyArtist[];
    }>(null);
    const isPopular = (artistInfo?.artist.popularity || -1) > POPULARITY_THRESHOLD;

    useEffect(() => {
        setArtistInfo(null);

        Promise.all(
            [ 
                get<SpotifyArtist>(`/artist/${artistId || getRandomArtist()}`),
                get<SpotifyTrack[]>(`/artist/${artistId}/tracks`),
                get<SpotifyAlbum[]>(`/artist/${artistId}/albums`),
                get<SpotifyFeaturedAlbum[]>(`/artist/${artistId}/featured`),
                get<SpotifyArtist[]>(`/artist/${artistId}/related`),
            ],
        ).then(([ artist, tracks, albums, featured, related ]) => {
            setArtistInfo({ artist, tracks, albums, featured, related });
        })
    }, [artistId]);

    return(
        <div className={`bg-secondary mt-36 ${isPopular ? 'gradient-border [--border-left:0] [--border-right:0]' : 'border-[1px] border-tertiary'}`}>
            <div className={`absolute left-2/4 -translate-x-2/4 ${isPopular ? 'gradient-border [--border-bottom:0px] [--border-left:1px] [--border-right:1px]' : 'border-[1px] border-b-0 border-tertiary'} mx-auto w-[800px] max-w-[80%] flex rounded-t-lg -translate-y-full`}>
                <div className={`absolute ${isPopular ? 'bg-[var(--gradient-from)]' : 'bg-tertiary'} bottom-0 right-full w-4 aspect-square rounded-br-lg before:absolute before:bg-secondary before:w-full before:aspect-square before:-z-[1] after:absolute after:bg-primary after:w-full after:aspect-square after:rounded-br-lg after:right-[1px] after:bottom-[1px]`} />
                <div className="flex-1 flex items-start justify-between p-4 bg-secondary rounded-t-xl">
                    <Artist
                        artist={artistInfo?.artist}
                        isPopular={isPopular}
                    />
                    {artistInfo && (
                        <Link
                            target="_blank" 
                            href={artistInfo.artist.external_urls.spotify}
                            className="text-xs transition-colors text-secondary hover:text-primary"
                        >
                            Follow {artistInfo.artist.name}
                        </Link>
                    )}
                </div>
                <div className={`absolute ${isPopular ? 'bg-[var(--gradient-from)]' : 'bg-tertiary'} bottom-0 left-full w-4 aspect-square rounded-bl-lg before:absolute before:bg-secondary before:w-full before:aspect-square before:-z-[1] after:absolute after:bg-primary after:w-full after:aspect-square after:rounded-bl-lg after:left-[1px] after:bottom-[1px]`} />
            </div>
            <HeaderArtistStats 
                tracks={artistInfo?.tracks}
                artist={artistInfo?.artist}
                albums={artistInfo?.albums}
                featured={artistInfo?.featured}
                related={artistInfo?.related}
            />
        </div>
    )
}