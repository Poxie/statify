import Link from "next/link";
import { MenuItem } from "./Menu";
import { twMerge } from "tailwind-merge";
import { useMenu } from "@/contexts/menu";

export default function MenuGroup({ items, className }: {
    items: MenuItem[];
    className?: string;
}) {
    const { close } = useMenu();

    const handleClick = (item: MenuItem) => {
        const closeOnClick = item.closeOnClick === undefined ? true : item.closeOnClick;
        if(closeOnClick) {
            close();
        }
        
        if(item.onClick) {
            item.onClick();
        }
    }

    return(
        <ul className={className}>
            {items.map(item => {
                const className = twMerge(
                    'px-2 py-1.5 block w-full text-left text-sm font-medium hover:bg-tertiary active:bg-opacity-70 transition-colors rounded',
                    item.type === 'danger' && 'text-danger hover:bg-danger hover:text-primary',
                )

                const commonProps = {
                    className,
                    onClick: () => handleClick(item),
                }

                const element = item.href ? (
                    <Link 
                        href={item.href}
                        {...commonProps}
                    >
                        {item.text}
                    </Link>
                ) : (
                    <button {...commonProps}>
                        {item.text}
                    </button>
                )

                return(
                    <li key={item.text}>
                        {element}
                    </li>
                )
            })}
        </ul>
    )
}