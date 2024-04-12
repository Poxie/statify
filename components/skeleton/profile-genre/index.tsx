import { twMerge } from "tailwind-merge";

export default function ProfileGenreSkeleton({ className }: {
    className?: string;
}) {
    return(
        <div className={twMerge(
            "grid gap-1",
            className,
        )}>
            <div className="flex items-center gap-2">
                <div className="w-12 h-6 bg-tertiary rounded-md" />
                <div className="w-16 h-4 bg-tertiary rounded-md" />
            </div>
            <div className="w-full h-7 bg-tertiary rounded-lg" />
        </div>
    )
}