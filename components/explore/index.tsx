"use client";
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config';
import ExploreInput from "./ExploreInput";
import TopListTrack from '@/components/top-lists/TopListTrack';
import ExploreChip from "./ExploreChip";
import { useState, useEffect, useMemo } from 'react';
import { SpotifyArtist, SpotifyTrack, SpotifyTrackWithColor } from '@/types';
import { get } from "@/utils";
import { AnimatePresence, motion } from 'framer-motion';

const background = resolveConfig(tailwindConfig).theme?.backgroundColor?.primary;

export default function Explore() {
    const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
    const [artists, setArtists] = useState<SpotifyArtist[]>([]);
    
    const [recommendations, setRecommendations] = useState<SpotifyTrackWithColor[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!tracks.length && !artists.length) return setLoading(true);

        const url = new URL(`${window.location.origin}/recommendations`);
        url.searchParams.set('seed_artists', artists.map(artist => artist.id).join(','));
        url.searchParams.set('seed_tracks', tracks.map(track => track.id).join(','));
        
        setLoading(true);
        
        const abortController = new AbortController();
        get<SpotifyTrackWithColor[]>(`${url.pathname}${url.search}`, abortController.signal).then(recommendations => {
            setRecommendations(recommendations);
            
            setTimeout(() => {
                setLoading(false);
            }, 0)
        })

        return () => abortController.abort();
    }, [artists.length, tracks.length]);

    const basedOnItems = useMemo(() => ([...artists, ...tracks]), [tracks.length, artists.length]);
    return(
        <main className="pt-20">
            <div className="text-center flex flex-col gap-4">
                <h1 className="text-4xl font-semibold">
                    Explore with us.
                </h1>
                <p className="text-lg text-secondary">
                    Find songs you might like based on your favorite songs, artists, and genres!
                </p>
            </div>
            <div 
                className="my-8 gradient-border [--border-left:0] [--border-right:0]"
                style={{ '--background': background } as React.CSSProperties}
            >
                <div className="py-8">
                    <div className="w-[900px] max-w-main mx-auto">
                        <div className="flex gap-2">
                            <ExploreInput<SpotifyArtist> 
                                type={'artist'}
                                items={artists}
                                onItemAdd={artist => setArtists(prev => prev.concat(artist))}
                                onItemRemove={artistId => setArtists(prev => prev.filter(artist => artist.id !== artistId))}
                            />
                            <ExploreInput<SpotifyTrack> 
                                type={'track'}
                                items={tracks}
                                onItemAdd={track => setTracks(prev => prev.concat(track))}
                                onItemRemove={trackId => setTracks(prev => prev.filter(track => track.id !== trackId))}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-main max-w-main mx-auto">
                <AnimatePresence>
                    {basedOnItems.length !== 0 && (
                        <motion.div 
                            className="mb-4 p-4 rounded-lg bg-secondary overflow-hidden"
                            exit={{ opacity: 0, translateY: 25 }}
                            initial={{ opacity: 0, translateY: 25 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ bounce: false, duration: .5 }}
                        >
                            <span className="mb-2 block text-xs font-semibold">
                                Here are some songs we recommend based on...
                            </span>
                            <div className="flex gap-1.5">
                                <AnimatePresence>
                                    {basedOnItems.map(item => {
                                        let image: undefined | string;

                                        if('images' in item) image = item.images.at(-1)?.url;
                                        if('album' in item) image = item.album.images.at(-1)?.url;

                                        return(
                                            <motion.div
                                                className="p-2 grid overflow-hidden bg-tertiary rounded-md"
                                                // Margin calulation is based on container gap and item padding.
                                                exit={{ gridTemplateColumns: '0fr', paddingLeft: 0, paddingRight: 0, marginRight: 'calc(-1 * 0.375rem)' }}
                                                initial={{ gridTemplateColumns: '0fr', paddingLeft: 0, paddingRight: 0, marginRight: 'calc(-1 * 0.375rem)' }}
                                                animate={{ gridTemplateColumns: '1fr', paddingLeft: '0.5rem', paddingRight: '0.5rem', marginRight: 0 }}
                                                transition={{ bounce: false, duration: .5 }}
                                                key={item.id}
                                            >
                                                <ExploreChip 
                                                    id={item.id}
                                                    text={item.name}
                                                    image={image}
                                                    className="min-w-0 p-0"
                                                />
                                            </motion.div>
                                        )
                                    })}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="grid grid-cols-5 gap-3">
                    {recommendations.map((track, index) => (
                        <TopListTrack
                            index={index}
                            track={track}
                            loading={loading}
                            showIndex={false}
                            small
                        />
                    ))}
                </div>
            </div>
        </main>
    )
}