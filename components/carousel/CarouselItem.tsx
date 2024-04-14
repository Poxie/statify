import { twMerge } from "tailwind-merge";

export default function CarouselItem({ children, itemsPerPage, itemCount }: {
    children: React.ReactNode;
    itemsPerPage: number;
    itemCount: number;
}) {
    const hasLessItems = itemCount < itemsPerPage;
    return(
        <div 
            className={twMerge(
                "grid gap-2",
                !hasLessItems && 'min-w-full'
            )}
            style={{ 
                gridTemplateColumns: `repeat(${itemCount}, 1fr)`,
                minWidth: !hasLessItems ? '100%' : `${(itemCount / itemsPerPage) * 100}%`,
            }}
        >
            {children}
        </div>
    )
}