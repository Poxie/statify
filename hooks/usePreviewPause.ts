import { useState, useEffect, useCallback } from 'react';
import { usePreview } from "@/contexts/preview"

export const usePreviewPause = () => {
    const { audio } = usePreview();
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if(!audio.current) return;
        audio.current.onpause = () => setPaused(true);
        audio.current.onplay = () => setPaused(false);
    }, []);
    const togglePause = () => {
        if(!audio.current) return;
        
        if(paused) return audio.current.play();
        audio.current.pause();
    }

    return { paused, togglePause };
}