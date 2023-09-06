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
        if(paused) return audio.current?.play();
        audio.current?.pause();
    }
    const setPause = (paused: boolean) => {
        if(paused) return audio.current?.pause();
        audio.current?.play();
    };

    return { paused, togglePause, setPause };
}