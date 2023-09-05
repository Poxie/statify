import { usePreview } from "@/contexts/preview";

export const usePreviewSkips = () => {
    const { setTrack, audio } = usePreview();

    const rewind = () => {
        if(!audio.current) return;
        audio.current.currentTime = 0;
        audio.current.play();
    }
    const forward = () => {
        setTrack(null);
    }

    return { rewind, forward };
}