import { twMerge } from "tailwind-merge";

export default function ProfilePodium({ index }: {
    index: number;
}) {
    return(
        <div className="gradient-border mt-4 rounded-lg overflow-hidden">
            <div className={twMerge(
                "py-3 flex-1 flex gap-0.5 items-end font-bold justify-center bg-secondary",
                index === 1 && 'md:py-10',
                index === 2 && 'md:py-6',
            )}>
                <span className="block text-secondary text-lg translate-y-[0.1rem]">
                    #
                </span>
                <span className={twMerge(
                    "text-2xl",
                    index === 1 && 'md:text-5xl',
                    index === 2 && 'md:text-3xl',
                )}>
                    {index}
                </span>
            </div>
        </div>
    )
}