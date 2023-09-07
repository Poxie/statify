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
import { useCombo } from '@/contexts/combo';
import clsx from 'clsx';

const OPACITY_TRANSITION = 500;
export default function HomeArtistInfo() {
    const { isPlaying } = useCombo();
    const artistId = useSearchParams().get('a');

    const [opacityZero, setOpacityZero] = useState(true);
    const [artistInfo, setArtistInfo] = useState<null | {
        artist: SpotifyArtist;
        tracks: SpotifyTrack[];
        albums: SpotifyAlbum[];
        featured: SpotifyFeaturedAlbum[];
        related: SpotifyArtist[];
        relatedTracks: SpotifyTrack[];
    }>(null);
    const isPopular = (artistInfo?.artist.popularity || -1) > POPULARITY_THRESHOLD;

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(isPlaying) {
            setOpacityZero(true);
            if(artistInfo) {
                setTimeout(() => {
                    setArtistInfo(null);
                }, OPACITY_TRANSITION);
            }
            return;
        }
        
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
                get<SpotifyTrack[]>(`/artist/${artistId}/related-tracks`),
            ],
        )

        setOpacityZero(true);

        const timeout = setTimeout(() => {
            requests.then(([ artist, tracks, albums, featured, related, relatedTracks ]) => {
                setArtistInfo({ artist, tracks, albums, featured, related, relatedTracks });
                setOpacityZero(false);
            })
        }, OPACITY_TRANSITION);

        return () => {
            if(timeout) clearTimeout(timeout);
            abortController.abort();
        }
    }, [artistId, isPlaying]);

    useAnimateStyle(ref, opacityZero, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
    })
    return(
        <div 
            className={clsx(
                "mt-36 relative z-10 bg-secondary",
                isPopular ? 'gradient-border [--border-left:0] [--border-right:0]' : 'border-[1px] border-tertiary',
            )}
            data-artist-id={artistInfo?.artist.id || artistId || ''}
        >
            <div className={clsx(
                "w-[800px] max-w-[90%] mx-auto absolute left-2/4 -translate-x-2/4 -translate-y-full flex rounded-t-lg sm:max-w-[80%]",
                isPopular ? 'gradient-border [--border-bottom:0px] [--border-left:1px] [--border-right:1px]' : 'border-[1px] border-b-0 border-tertiary',
            )}>
                <div className={clsx(
                    "w-4 aspect-square absolute bottom-0 right-full rounded-br-lg",
                    "before:absolute before:bg-secondary before:w-full before:aspect-square before:-z-[1]",
                    "after:absolute after:bg-primary after:w-full after:aspect-square after:rounded-br-lg after:right-[1px] after:bottom-[1px]",
                    isPopular ? 'bg-[var(--gradient-from)]' : 'bg-tertiary',
                )} />
                <div className="flex-1 bg-secondary rounded-t-[.45rem]">
                    <div 
                        className="p-4 flex-1 flex flex-col gap-2 items-start justify-between sm:flex-row"
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
                                className="text-xs text-secondary hover:text-primary transition-colors"
                            >
                                Follow {artistInfo.artist.name}
                            </Link>
                        )}
                    </div>
                </div>
                <div className={clsx(
                    "w-4 aspect-square absolute bottom-0 left-full rounded-bl-lg",
                    "before:absolute before:bg-secondary before:w-full before:aspect-square before:-z-[1]",
                    "after:absolute after:bg-primary after:w-full after:aspect-square after:rounded-bl-lg after:left-[1px] after:bottom-[1px]",
                    isPopular ? 'bg-[var(--gradient-to)]' : 'bg-tertiary',
                )} />
            </div>
            <HeaderArtistStats 
                tracks={artistInfo?.tracks}
                artist={artistInfo?.artist}
                albums={artistInfo?.albums}
                featured={artistInfo?.featured}
                related={artistInfo?.related}
                relatedTracks={artistInfo?.relatedTracks}
                opacityZero={opacityZero}
            />
        </div>
    )
}