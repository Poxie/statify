import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export default function Button({
    children,
    onClick,
    href,
    small,
    disabled,
    className='',
}: {
    className?: string;
    onClick?: () => void;
    small?: boolean;
    href?: string;
    children: React.ReactNode;
    disabled?: boolean;
}) {
    const props = {
        onClick,
        disabled,
        className: twMerge(
            "transition-colors bg-c-primary",
            small ? 'py-[10px] px-3 text-xs rounded-md' : 'py-[14px] px-4 text-sm rounded-lg',
            disabled ? 'bg-opacity-75 cursor-not-allowed' : 'hover:bg-c-primary-accent',
            className,
        )
    }

    return(
        href ? (
            <Link
                href={href}
                {...props}
            >
                {children}
            </Link>
        ) : (
            <button {...props}>
                {children}
            </button>
        )
    )
}