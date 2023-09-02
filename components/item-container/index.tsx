export default function ItemContainer({ title, emptyLabel, isEmpty, children, className='' }: {
    title: string;
    emptyLabel: string;
    isEmpty: boolean;
    children: React.ReactNode;
    className?: string;
}) {
    return(
        <div className={`flex flex-col rounded-lg p-4 border-[1px] border-tertiary ${className}`}>
            <span className="block text-xs text-secondary mb-3">
                {title}
            </span>
            {!isEmpty ? (
                children
            ) : (
                <span className="text-sm text-secondary">
                    {emptyLabel}
                </span>
            )}
        </div>
    )
}