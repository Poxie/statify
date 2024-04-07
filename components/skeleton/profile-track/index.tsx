import { twMerge } from "tailwind-merge";

export default function ProfileTrackSkeleton({ containerClassName, imageClassName, trackNameClassName, artistClassName }: { 
    containerClassName?: string;
    imageClassName?: string;
    trackNameClassName?: string;
    artistClassName?: string;
}) {
    return(
        <div className={twMerge(
            "flex flex-col gap-2",
            containerClassName,
        )}>
            <div className={twMerge(
                "w-full aspect-square bg-tertiary rounded-lg border-2 border-transparent",
                imageClassName,
            )} />
            <div className="flex flex-col gap-0.5">
                <div className={twMerge(
                    "w-24 h-4 bg-tertiary rounded-md",
                    trackNameClassName,
                )}/>
                <div className={twMerge(
                    "w-12 h-3 bg-tertiary rounded-md",
                    artistClassName,
                )} />
            </div>
        </div>
    )
}