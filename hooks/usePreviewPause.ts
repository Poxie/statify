import { useState, useEffect } from 'react';
import { usePreview } from "@/contexts/preview"

export const usePreviewPause = () => {
    const { audio } = usePreview();
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        const onPause = () => setPaused(true);
        const onPlay = () => setPaused(false);

        audio.current?.addEventListener('pause', onPause);
        audio.current?.addEventListener('play', onPlay);
        return () => {
            audio.current?.removeEventListener('pause', onPause);
            audio.current?.removeEventListener('play', onPlay);
        }
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