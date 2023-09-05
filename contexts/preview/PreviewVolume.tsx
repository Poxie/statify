import { useRef } from 'react';
import { VolumeIcon } from "@/assets/icons/VolumeIcon";
import { usePreview } from '.';

export default function PreviewVolume() {
    const { audio } = usePreview();
    
    const slider = useRef<HTMLDivElement>(null);
    const progress = useRef<HTMLDivElement>(null);

    const onMouseMove = (e: MouseEvent | React.MouseEvent) => {
        if(!audio.current || !slider.current || !progress.current) return;

        const { left, width } = slider.current.getBoundingClientRect();
        
        const mouseSliderPosition = e.clientX - left;
        let volumeDecimal = mouseSliderPosition / width;

        if(volumeDecimal < 0) volumeDecimal = 0;
        if(volumeDecimal > 1) volumeDecimal = 1;

        progress.current.style.width = `${volumeDecimal * 100}%`;
        audio.current.volume = volumeDecimal;
    }
    const onMouseUp = () => {
        document.body.style.userSelect = '';
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }
    const onMouseDown = () => {
        document.body.style.userSelect = 'none';
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }

    return(
        <div className="flex items-center justify-end gap-3">
            <div 
                className="w-32 h-4 flex items-center"
                onMouseDown={onMouseDown}
                onClick={onMouseMove}
                ref={slider}
            >
                <div className="flex-1 h-2 bg-t-secondary rounded-full justify-self-end">
                    <div
                        className="relative w-full h-full bg-c-primary rounded-full"
                        ref={progress}
                    >
                        <div className="[--dot-width:0.875rem] w-[var(--dot-width)] absolute left-[calc(100%-var(--dot-width)/2)] top-2/4 -translate-y-2/4 aspect-square rounded-full bg-c-primary" />
                    </div>
                </div>
            </div>
            <VolumeIcon className="w-5" />
        </div>
    )
}