"use client";
import Artists from '@/assets/json/defaultArtists.json';
import { SpotifyAlbum, SpotifyArtist, SpotifyFeaturedAlbum, SpotifyTrack } from '@/types';
import Artist from '../artist';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { get, getRandomArtist } from '@/utils';
import HeaderArtistStats from './HeaderArtistStats';
import { POPULARITY_THRESHOLD } from '@/utils/constants';
import { useAnimateStyle } from '@/hooks/useAnimateStyle';

const OPACITY_TRANSITION = 500;
export default function HomeArtistInfo() {
    const artistId = useSearchParams().get('a');

    const [opacityZero, setOpacityZero] = useState(true);
    const [artistInfo, setArtistInfo] = useState<null | {
        artist: SpotifyArtist;
        tracks: SpotifyTrack[];
        albums: SpotifyAlbum[];
        featured: SpotifyFeaturedAlbum[];
        related: SpotifyArtist[];
    }>(null);
    const isPopular = (artistInfo?.artist.popularity || -1) > POPULARITY_THRESHOLD;

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const id = artistId || getRandomArtist();
        const requests = Promise.all(
            [ 
                get<SpotifyArtist>(`/artist/${id}`, signal),
                get<SpotifyTrack[]>(`/artist/${id}/tracks`, signal),
                get<SpotifyAlbum[]>(`/artist/${id}/albums`, signal),
                get<SpotifyFeaturedAlbum[]>(`/artist/${id}/featured`, signal),
                get<SpotifyArtist[]>(`/artist/${id}/related`, signal),
            ],
        )

        setOpacityZero(true);

        const timeout = setTimeout(() => {
            requests.then(([ artist, tracks, albums, featured, related ]) => {
                setArtistInfo({ artist, tracks, albums, featured, related });
                setOpacityZero(false);
            })
        }, OPACITY_TRANSITION);

        return () => {
            if(timeout) clearTimeout(timeout);
            abortController.abort();
        }
    }, [artistId]);

    useAnimateStyle(ref, opacityZero, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
    })
    return(
        <div 
            className={`bg-secondary mt-36 ${isPopular ? 'gradient-border [--border-left:0] [--border-right:0]' : 'border-[1px] border-tertiary'}`}
            data-artist-id={artistInfo?.artist.id || ''}
        >
            <div className={`absolute left-2/4 -translate-x-2/4 ${isPopular ? 'gradient-border [--border-bottom:0px] [--border-left:1px] [--border-right:1px]' : 'border-[1px] border-b-0 border-tertiary'} mx-auto w-[800px] max-w-[80%] flex rounded-t-lg -translate-y-full`}>
                <div className={`absolute ${isPopular ? 'bg-[var(--gradient-from)]' : 'bg-tertiary'} bottom-0 right-full w-4 aspect-square rounded-br-lg before:absolute before:bg-secondary before:w-full before:aspect-square before:-z-[1] after:absolute after:bg-primary after:w-full after:aspect-square after:rounded-br-lg after:right-[1px] after:bottom-[1px]`} />
                <div className="flex-1 bg-secondary rounded-t-xl">
                    <div 
                        className="flex-1 flex items-start justify-between p-4"
                        ref={ref}
                    >
                        <Artist
                            artist={artistInfo?.artist}
                            hasPopularityExplanation
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
                </div>
                <div className={`absolute ${isPopular ? 'bg-[var(--gradient-from)]' : 'bg-tertiary'} bottom-0 left-full w-4 aspect-square rounded-bl-lg before:absolute before:bg-secondary before:w-full before:aspect-square before:-z-[1] after:absolute after:bg-primary after:w-full after:aspect-square after:rounded-bl-lg after:left-[1px] after:bottom-[1px]`} />
            </div>
            <HeaderArtistStats 
                tracks={artistInfo?.tracks}
                artist={artistInfo?.artist}
                albums={artistInfo?.albums}
                featured={artistInfo?.featured}
                related={artistInfo?.related}
                opacityZero={opacityZero}
            />
        </div>
    )
}