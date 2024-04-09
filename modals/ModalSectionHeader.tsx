import { twMerge } from "tailwind-merge";

export default function ModalSectionHeader({ text, className }: {
    text: string;
    className?: string;
}) {
    return(
        <span className={twMerge(
            "block text-xs uppercase font-semibold",
            className,
        )}>
            {text}
        </span>
    )
}