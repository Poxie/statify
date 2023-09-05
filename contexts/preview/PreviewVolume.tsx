import { VolumeIcon } from "@/assets/icons/VolumeIcon";

export default function PreviewVolume() {
    return(
        <div className="flex items-center justify-end gap-3">
            <div className="w-32 h-1.5 bg-t-secondary rounded-full justify-self-end">
                <div className="relative w-14 h-full bg-c-primary rounded-full">
                    <div className="[--dot-width:0.875rem] w-[var(--dot-width)] absolute left-[calc(100%-var(--dot-width)/2)] top-2/4 -translate-y-2/4 aspect-square rounded-full bg-c-primary" />
                </div>
            </div>
            <VolumeIcon className="w-5" />
        </div>
    )
}