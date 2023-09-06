import { useEffect, useRef } from 'react';
import { VolumeIcon } from "@/assets/icons/VolumeIcon";
import { usePreview } from '.';
import { useSlider } from '@/hooks/useSlider';
import { usePreviewMute } from '@/hooks/usePreviewMute';
import { NoVolumeIcon } from '@/assets/icons/NoVolumeIcon';
import { HasTooltip } from '../tooltip/HasTooltip';

export default function PreviewVolume() {
    const { audio } = usePreview();
    const { muted, toggleMuted } = usePreviewMute();
    
    const slider = useRef<HTMLDivElement>(null);
    const progress = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!audio.current || !progress.current) return;
        progress.current.style.width = `${audio.current.volume * 100}%`;
    }, []);

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
            <HasTooltip
                onClick={toggleMuted}
                tooltip={muted ? 'Unmute audio' : 'Mute audio'}
            >
                {!muted ? (
                    <VolumeIcon className="w-5" />
                ) : (
                    <NoVolumeIcon className="w-5" />
                )}
            </HasTooltip>
        </div>
    )
}