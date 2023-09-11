"use client";
import React, { RefObject, useEffect, useState, useRef, useCallback } from 'react';
import { SpotifyTrack } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import PreviewProgress from './PreviewProgress';
import PreviewContent from './PreviewContent';
import PreviewHistory from './PreviewHistory';

type Track = SpotifyTrack | null;
const PreviewContext = React.createContext<null | {
    track: Track;
    addTrack: (track: SpotifyTrack) => void;
    closePreview: () => void;
    audio: RefObject<HTMLAudioElement>;
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
    history: SpotifyTrack[];
    clearHistory: () => void;
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
    const [expanded, setExpanded] = useState(false);
    const [history, setHistory] = useState<SpotifyTrack[]>([]);
    const audio = useRef<null | HTMLAudioElement>(null);

    const addTrack = useCallback((track: SpotifyTrack) => {
        if(!track.preview_url) return;

        if(!audio.current) {
            const audioElement = new Audio();
            audioElement.volume = DEFAULT_VOLUME;
            audio.current = audioElement;
        }

        audio.current.src = track.preview_url;
        audio.current.currentTime = 0;
        audio.current.play();

        setHistory(prev => (
            [...[track], ...prev.filter(t => t.id !== track.id)]
        ));
        setTrack(track);
    }, [setTrack]);

    const closePreview = useCallback(() => {
        if(!audio.current) return;

        audio.current.srcObject = null;
        audio.current = null;
        setTrack(null);
    }, [setTrack]);
    
    const clearHistory = useCallback(() => setHistory([]), [setHistory]);

    const value = {
        track,
        addTrack,
        closePreview,
        audio,
        expanded,
        setExpanded,
        history,
        clearHistory,
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
                        className="w-full fixed bottom-0 left-0 z-20 bg-tertiary"
                    >
                        <PreviewProgress />
                        <PreviewContent />
                        <PreviewHistory />
                    </motion.div>
                )}
            </AnimatePresence>
            </>
        </PreviewContext.Provider>
    )
}