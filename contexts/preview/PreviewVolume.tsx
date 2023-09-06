import { useRef } from 'react';
import { VolumeIcon } from "@/assets/icons/VolumeIcon";
import { usePreview } from '.';
import { useSlider } from '@/hooks/useSlider';
import { usePreviewMute } from '@/hooks/usePreviewMute';
import { NoVolumeIcon } from '@/assets/icons/NoVolumeIcon';

export default function PreviewVolume() {
    const { audio } = usePreview();
    const { muted, toggleMuted } = usePreviewMute();
    
    const slider = useRef<HTMLDivElement>(null);
    const progress = useRef<HTMLDivElement>(null);

    const onVolumeChange = (decimal: number) => {
        if(!audio.current) return;
        audio.current.volume = decimal;
        audio.current.muted = false;
    }
    
    useSlider({
        slider,
        progress,
        onChange: onVolumeChange,
    })
    return(
        <div className="flex items-center justify-end gap-3">
            <div 
                className="w-32 h-4 flex items-center"
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
            <button
                aria-label={muted ? 'Unmute audio' : 'Mute audio'} 
                onClick={toggleMuted}
            >
                {!muted ? (
                    <VolumeIcon className="w-5" />
                ) : (
                    <NoVolumeIcon className="w-5" />
                )}
            </button>
        </div>
    )
}