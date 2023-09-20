import { twMerge } from 'tailwind-merge';

export default function Button({
    children,
    onClick,
    small,
    className='',
}: {
    className?: string;
    onClick?: () => void;
    small?: boolean;
    children: React.ReactNode;
}) {
    return(
        <button
            onClick={onClick}
            className={twMerge(
                "transition-colors bg-c-primary hover:bg-c-primary-accent",
                small ? 'py-[10px] px-3 text-xs rounded-md' : 'py-[14px] px-4 text-sm rounded-lg',
                className,
            )}
        >
            {children}
        </button>
    )
}