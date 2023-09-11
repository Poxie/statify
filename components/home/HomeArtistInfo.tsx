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
import { useArtistInfo } from '@/hooks/useArtistInfo';

const RANDOM_ARTIST_ID = getRandomArtist();
const OPACITY_TRANSITION = 500;
export default function HomeArtistInfo() {
    const { isPlaying } = useCombo();
    const artistId = useSearchParams().get('a');

    const ref = useRef<HTMLDivElement>(null);

    const { info, loading } = useArtistInfo(
        !isPlaying ? artistId || RANDOM_ARTIST_ID : null, 
        { extraDuration: OPACITY_TRANSITION }
    );
    useAnimateStyle(ref, loading, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
    })
    
    const isPopular = (info?.artist.popularity || -1) > POPULARITY_THRESHOLD;
    return(
        <div 
            className={clsx(
                "mt-36 relative z-10 bg-secondary",
                isPopular ? 'gradient-border [--border-left:0] [--border-right:0]' : 'border-[1px] border-tertiary',
            )}
            data-artist-id={artistId || info?.artist.id || ''}
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
                            artist={info?.artist}
                            hasPopularityExplanation
                            isPopular={isPopular}
                        />
                        {info && (
                            <Link
                                target="_blank" 
                                href={info.artist.external_urls.spotify}
                                className="text-xs text-secondary hover:text-primary transition-colors"
                            >
                                Follow {info.artist.name}
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
                tracks={info?.tracks}
                artist={info?.artist}
                albums={info?.albums}
                featured={info?.featured}
                related={info?.relatedArtists}
                relatedTracks={info?.relatedTracks}
                loading={loading}
            />
        </div>
    )
}