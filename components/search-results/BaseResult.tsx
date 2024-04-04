import { twMerge } from "tailwind-merge";

export default function BaseResult({ children, onClick, className }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
}) {
    return(
        <button 
            className={twMerge(
                "p-2 w-full hover:bg-tertiary rounded-md transition-colors text-left",
                className,
            )}
            onClick={onClick}
        >
            {children}
        </button>
    )
}