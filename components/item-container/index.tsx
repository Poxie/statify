import clsx from "clsx";
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
            className={clsx(
                "flex flex-col rounded-lg p-4 border-[1px]",
                loading ? 'border-transparent' : 'border-tertiary',
                className,
            )}
            ref={ref}
        >
            <span className="block mb-3 h-4 text-xs text-secondary">
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
ItemContainer.displayName = 'ItemContainer';
export default ItemContainer;