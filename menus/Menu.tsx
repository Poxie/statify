import MenuGroup from "./MenuGroup";

export type MenuItem = {
    text: string;
    onClick?: () => void;
    href?: string;
    type?: 'danger';
    closeOnClick?: boolean;
}
export type MenuGroup = MenuItem[];

export default function Menu({ groups }: {
    groups: MenuGroup[];
}) {
    return(
        <ul className="min-w-[180px] p-2 grid bg-secondary rounded-md shadow-2xl divide-y-[1px] divide-tertiary divide-m">
            {groups.map((items, index) => (
                <li 
                    className="group"
                    key={index}
                >
                    <MenuGroup 
                        items={items}
                        className="mt-1 mb-1 group-first:mt-0 group-last:mb-0"
                    />
                </li>
            ))}
        </ul>
    )
}