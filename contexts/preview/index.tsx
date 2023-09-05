"use client";
import Link from 'next/link';
import SpotifyImage from '@/components/spotify-image';
import { SpotifyTrack } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import React, { RefObject, useState, useRef } from 'react';
import PreviewTrack from './PreviewTrack';
import PreviewContent from './PreviewContent';

type Track = SpotifyTrack | null;
const PreviewContext = React.createContext<null | {
    track: Track;
    setTrack: (Track: Track) => void;
    audio: RefObject<HTMLAudioElement>;
}>(null);

export const usePreview = () => {
    const context = React.useContext(PreviewContext);
    if(!context) throw new Error('Component is not wrapped in preview provider.');
    return context;
}

export default function PreviewProvider({ children }: {
    children: React.ReactNode;
}) {
    const [track, setTrack] = useState<Track>(null);
    const audio = useRef(new Audio());

    const value = {
        track,
        setTrack,
        audio,
    }
    return(
        <PreviewContext.Provider value={value}>
            <>
            {children}
            <AnimatePresence>
                {track && (
                    <motion.div 
                        exit={{ translateY: '100%' }}
                        initial={{ translateY: '100%' }}
                        animate={{ translateY: 0 }}
                        transition={{ bounce: false }}
                        className="p-4 w-full fixed bottom-0 left-0 z-20 bg-tertiary border-t-4 border-t-text-secondary"
                    >
                        <PreviewTrack />
                        <PreviewContent />
                    </motion.div>
                )}
            </AnimatePresence>
            </>
        </PreviewContext.Provider>
    )
}