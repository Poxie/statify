"use client";
import React, { RefObject, useEffect, useState, useRef, useCallback } from 'react';
import { SpotifyTrack } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import PreviewProgress from './PreviewProgress';
import PreviewContent from './PreviewContent';

type Track = SpotifyTrack | null;
const PreviewContext = React.createContext<null | {
    track: Track;
    setTrack: (Track: Track) => void;
    audio: RefObject<HTMLAudioElement>;
    initializeAudio: (track: SpotifyTrack) => void;
}>(null);

export const usePreview = () => {
    const context = React.useContext(PreviewContext);
    if(!context) throw new Error('Component is not wrapped in preview provider.');
    return context;
}

const DEFAULT_VOLUME = .4;
export default function PreviewProvider({ children }: {
    children: React.ReactNode;
}) {
    const [track, setTrack] = useState<Track>(null);
    const audio = useRef<null | HTMLAudioElement>(null);

    const initializeAudio = useCallback((track: SpotifyTrack) => {
        const audioContext = new AudioContext();
        const audioElement = new Audio();
        audioElement.crossOrigin = 'anonymous';
        audioElement.volume = DEFAULT_VOLUME;
        const mediaElement = audioContext.createMediaElementSource(audioElement);
        mediaElement.connect(audioContext.destination);
        audio.current = audioElement;
        setTrack(track);
    }, []);
    useEffect(() => {
        if(!audio.current) return;

        if(!track?.preview_url) {
            audio.current.currentTime = 0;
            audio.current.srcObject = null;
            return;
        } 

        audio.current.src = track.preview_url;
        audio.current.currentTime = 0;
        audio.current.play();
    }, [track?.id]);

    const value = {
        initializeAudio,
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
                        className="p-4 w-full fixed bottom-0 left-0 z-20 bg-tertiary"
                    >
                        <PreviewProgress />
                        <PreviewContent />
                    </motion.div>
                )}
            </AnimatePresence>
            </>
        </PreviewContext.Provider>
    )
}