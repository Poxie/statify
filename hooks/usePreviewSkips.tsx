import { usePreview } from "@/contexts/preview";

export const usePreviewSkips = () => {
    const { closePreview, audio } = usePreview();

    const rewind = () => {
        if(!audio.current) return;
        audio.current.currentTime = 0;
        audio.current.play();
    }
    const forward = closePreview;

    return { rewind, forward };
}