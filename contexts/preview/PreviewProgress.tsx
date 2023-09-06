import { usePreview } from '.';
import { useEffect, useRef } from 'react';
import { useSlider } from '@/hooks/useSlider';
import { usePreviewPause } from '@/hooks/usePreviewPause';

export default function PreviewProgress() {
    const { audio } = usePreview();
    const { setPause } = usePreviewPause();

    const isDragging = useRef(false);
    const slider = useRef<HTMLDivElement>(null);
    const progress = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleNaturalProgress = () => {
            if(!audio.current || !progress.current || isDragging.current) return;

            const percentage = (audio.current.currentTime / audio.current.duration) * 100;
            progress.current.style.width = `${percentage}%`;
        }
        
        audio.current?.addEventListener('timeupdate', handleNaturalProgress);
        return () => audio.current?.addEventListener('timeupdate', handleNaturalProgress);
    }, []);

    const onDragStart = (isClick: boolean) => {
        isDragging.current = true;
        setPause(!isClick);
    }
    const onDragEnd = (decimal: number) => {
        if(!audio.current) return;
        isDragging.current = false;

        const newTrackTime = decimal * audio.current.duration;
        audio.current.currentTime = newTrackTime;

        setPause(false);
    }

    useSlider({ 
        slider, 
        progress, 
        onDragEnd,
        onDragStart,
    });
    return(
        <div 
            className="[--container-height:1rem] [--track-height:.35rem] [--track-hover-height:.65rem] group h-[var(--container-height)] w-full absolute bottom-[calc(100%-(var(--container-height)-var(--track-height)*1.8))] left-0 flex items-center"
            ref={slider}
        >
            <div className={`absolute left-0 w-full h-[var(--track-height)] group-hover:h-[var(--track-hover-height)] group-active:h-[var(--track-hover-height)] transition-[height] bg-t-secondary`} />
            <div 
                className={`absolute left-0 bg-c-primary h-[var(--track-height)] group-hover:h-[var(--track-hover-height)] group-active:h-[var(--track-hover-height)] transition-[height]`} 
                ref={progress}
            >
                <div className={`[--dot-width:.75rem] w-[var(--dot-width)] group-hover:w-[calc(var(--dot-width)+var(--track-hover-height)/2)] group-active:w-[calc(var(--dot-width)+var(--track-hover-height)/2)] transition-[width] aspect-square rounded-full absolute top-2/4 -translate-y-2/4 left-[calc(100%-var(--dot-width))] bg-c-primary`} />
            </div>
        </div>
    )
}