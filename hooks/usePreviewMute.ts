import { usePreview } from "@/contexts/preview"
import { useEffect, useState } from "react";

export const usePreviewMute = () => {
    const { audio } = usePreview();
    const [muted, setMuted] = useState(audio.current?.volume === 0);

    useEffect(() => {
        const onVolumeChange = () => {
            setMuted(audio.current?.volume === 0 || (audio.current?.muted || false));
        }

        audio.current?.addEventListener('volumechange', onVolumeChange);
        return () => audio.current?.removeEventListener('volumechange', onVolumeChange);
    }, []);
    const toggleMuted = () => {
        if(!audio.current) return;
        audio.current.muted = !audio.current.muted;
    }

    return { muted, toggleMuted };
}