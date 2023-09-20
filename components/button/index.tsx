import { twMerge } from 'tailwind-merge';

export default function Button({
    children,
    onClick,
    small,
    disabled,
    className='',
}: {
    className?: string;
    onClick?: () => void;
    small?: boolean;
    children: React.ReactNode;
    disabled?: boolean;
}) {
    return(
        <button
            onClick={onClick}
            className={twMerge(
                "transition-colors bg-c-primary",
                small ? 'py-[10px] px-3 text-xs rounded-md' : 'py-[14px] px-4 text-sm rounded-lg',
                disabled ? 'bg-opacity-75 cursor-not-allowed' : 'hover:bg-c-primary-accent',
                className,
            )}
            disabled={disabled}
        >
            {children}
        </button>
    )
}