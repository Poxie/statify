import React from "react";

const ItemContainer = React.forwardRef<HTMLDivElement, {
    title?: string;
    emptyLabel: string;
    isEmpty: boolean;
    children: React.ReactNode;
    loading?: boolean;
    className?: string;
}>(({ title, isEmpty, emptyLabel, loading, className='', children }, ref) => {
    return(
        <div 
            className={`flex flex-col rounded-lg p-4 border-[1px] ${loading ? 'border-transparent' : 'border-tertiary'} ${className}`}
            ref={ref}
        >
            <span className="block text-xs text-secondary mb-3 h-4">
                {title}
            </span>

            {(!isEmpty || loading) ? (
                children
            ) : (
                <span className="text-sm text-secondary">
                    {emptyLabel}
                </span>
            )}
        </div>
    )
})
export default ItemContainer;