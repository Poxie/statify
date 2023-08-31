export default function Button({
    children,
    onClick,
    className='',
}: {
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}) {
    return(
        <button
            onClick={onClick}
            className={`transition-colors bg-c-primary hover:bg-c-primary-accent rounded-lg text-sm py-[14px] px-4 ${className}`}
        >
            {children}
        </button>
    )
}