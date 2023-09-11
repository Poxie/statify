"use client";
import clsx from 'clsx';
import HomeArtistInfo from './HomeArtistInfo';
import HeaderArtistStats from './HeaderArtistStats';
import { useSearchParams } from 'next/navigation';
import { getRandomArtist } from '@/utils';
import { POPULARITY_THRESHOLD } from '@/utils/constants';
import { useCombo } from '@/contexts/combo';
import { useArtistInfo } from '@/hooks/useArtistInfo';

const RANDOM_ARTIST_ID = getRandomArtist();
const OPACITY_TRANSITION = 500;
export default function HomeArtist() {
    const { isPlaying } = useCombo();
    const artistId = useSearchParams().get('a');

    const { info, loading } = useArtistInfo(
        !isPlaying ? artistId || RANDOM_ARTIST_ID : null, 
        { extraDuration: OPACITY_TRANSITION }
    );

    const isPopular = (info?.artist.popularity || -1) > POPULARITY_THRESHOLD;
    return(
        <div 
            className={clsx(
                "mt-36 relative z-10 bg-secondary",
                isPopular ? 'gradient-border [--border-left:0] [--border-right:0]' : 'border-[1px] border-tertiary',
            )}
            data-artist-id={artistId || info?.artist.id || ''}
        >
            <HomeArtistInfo 
                isPopular={isPopular}
                artist={info?.artist}
                loading={loading}
            />
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