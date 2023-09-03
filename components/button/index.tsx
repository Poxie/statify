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
            className={`transition-colors bg-c-primary hover:bg-c-primary-accent rounded-lg ${small ? 'py-[10px] px-3 text-xs' : 'py-[14px] px-4 text-sm'} ${className}`}
        >
            {children}
        </button>
    )
}