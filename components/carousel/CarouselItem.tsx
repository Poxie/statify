import { twMerge } from "tailwind-merge";

export default function CarouselItem({ children, itemsPerPage, itemCount, hasMultiplePages }: {
    children: React.ReactNode;
    itemsPerPage: number;
    itemCount: number;
    hasMultiplePages: boolean;
}) {
    const hasLessItems = itemCount < itemsPerPage;
    return(
        <div 
            className={twMerge(
                "px-1 grid gap-2",
                !hasLessItems && 'min-w-full'
            )}
            style={{ 
                gridTemplateColumns: `repeat(${hasMultiplePages ? itemCount : itemsPerPage}, 1fr)`,
                minWidth: !(hasLessItems || hasMultiplePages) ? '100%' : `${(itemCount / itemsPerPage) * 100}%`,
            }}
        >
            {children}
        </div>
    )
}