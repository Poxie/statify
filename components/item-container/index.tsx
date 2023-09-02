export default function ItemContainer({ title, emptyLabel, isEmpty, children, loading, className='', style={} }: {
    title: string;
    emptyLabel: string;
    isEmpty: boolean;
    children: React.ReactNode;
    loading?: boolean;
    className?: string;
    style?: React.CSSProperties;
}) {
    return(
        <div 
            className={`flex flex-col rounded-lg p-4 border-[1px] border-tertiary ${className}`}
            style={style}
        >
            {!loading ? (
                <span className="block text-xs text-secondary mb-3">
                    {title}
                </span>
            ) : (
                <span className="block h-4 mb-3">
                    
                </span>
            )}
            {(!isEmpty || loading) ? (
                children
            ) : (
                <span className="text-sm text-secondary">
                    {emptyLabel}
                </span>
            )}
        </div>
    )
}