export default function Chip({ children, type='default', className='' }: {
    className?: string;
    type?: 'default' | 'gradient';
    children: React.ReactNode;
}) {
    return(
        <span className={`text-[10px] font-semibold py-[4px] px-[6px] rounded ${type === 'default' ? 'bg-tertiary' : 'gradient-background [--bg-opacity:.8]'} ${className}`}>
            {children}
        </span>
    )
}