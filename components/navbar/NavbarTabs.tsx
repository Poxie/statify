"use client";
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
    { text: 'Home', path: '/' },
    { text: 'Top lists', path: '/top-lists' },
    { text: 'Explore', path: '/explore' },
    { text: 'Profile', path: '/profile' },
]
export default function NavbarTabs({ open, toggle, isSmallScreen }: { 
    isSmallScreen: boolean;
    open: boolean;
    toggle: () => void;
}) {
    const pathname = usePathname();
    
    const tabsAreVisible = open || !isSmallScreen;
    return(
        <ul className={clsx(
            "h-full w-full fixed z-20 top-0 py-32 flex flex-col items-center gap-10 bg-secondary duration-500 transition-[left]",
            "md:w-[unset] md:h-[unset] md:p-0 md:flex-row md:relative md:left-[unset] md:bg-transparent md:gap-4",
            open ? 'left-0' : 'left-full', 
        )}>
            {TABS.map((tab, key) => (
                <li 
                    className={clsx(
                        "transition-all duration-300",
                        tabsAreVisible ? 'opacity-1 translate-x-0' : 'opacity-0 translate-x-6',
                    )}
                    style={{ transitionDelay: `${key * .05 + .3}s` }}
                    key={tab.path}
                >
                    <Link 
                        href={tab.path}
                        className={clsx(
                            "text-3xl md:text-sm transition-colors hover:text-primary",
                            tab.path === pathname ? 'text-primary' : 'text-secondary',
                        )}
                        onClick={isSmallScreen ? toggle : undefined}
                        tabIndex={tabsAreVisible ? undefined : -1}
                    >
                        {tab.text}
                    </Link>
                </li>
            ))}
        </ul>
    )
}