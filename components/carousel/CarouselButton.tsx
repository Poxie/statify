import { ArrowIcon } from "@/assets/icons/ArrowIcon";
import { twMerge } from "tailwind-merge";

export default function CarouselButton({ onClick, type, disabled }: {
    onClick: () => void;
    type: 'next' | 'prev';
    disabled?: boolean;
}) {
    return(
        <button
            onClick={onClick}
            className={twMerge(
                "p-2 z-10 absolute top-2/4 -translate-y-2/4 bg-secondary active:bg-tertiary transition-colors shadow-xl rounded-full",
                type === 'next' && 'right-0',
                type === 'prev' && 'left-0',
            )}
        >
            <ArrowIcon className={twMerge(
                "w-5",
                type === 'next' && '-rotate-90',
                type === 'prev' && 'rotate-90',
            )} />
        </button>
    )
}