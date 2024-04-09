import { twMerge } from "tailwind-merge";

export default function TabSelector<T extends string>({ items, selectedItemId, onSelect, className }: {
    items: Readonly<{
        id: T;
        text: string;
    }[]>;
    selectedItemId: T;
    onSelect: (selectedId: T) => void;
    className?: string;
}) {
    const selectedTab = items.find(item => item.id === selectedItemId);
    return(
        <ul className={twMerge(
            "flex gap-4",
            className,
        )}>
            {items.map(item => {
                const active = item.id === selectedItemId;
                return(
                    <li key={item.id}>
                        <button 
                            onClick={() => onSelect(item.id)}
                            className={twMerge(
                                "pb-2 text-sm text-secondary border-b-2 border-b-transparent hover:text-primary transition-colors",
                                active && 'text-primary border-b-text-primary',
                            )}
                        >
                            {item.text}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}