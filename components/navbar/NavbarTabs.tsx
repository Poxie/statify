"use client";
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
        <ul className={`flex flex-col md:flex-row items-center py-32 gap-10 fixed top-0 duration-500 transition-[left] ${open ? 'left-0' : 'left-full'} h-full w-full bg-secondary z-20 md:relative md:left-[unset] md:bg-transparent md:w-[unset] md:h-[unset] md:p-0 md:gap-4`}>
            {TABS.map((tab, key) => (
                <li 
                    className={`transition-all duration-300 ${tabsAreVisible ? 'opacity-1 translate-x-0' : 'opacity-0 translate-x-6'}`}
                    style={{ transitionDelay: `${key * .05 + .3}s` }}
                    key={tab.path}
                >
                    <Link 
                        href={tab.path}
                        className={`text-3xl md:text-sm transition-colors ${tab.path === pathname ? 'text-primary' : 'text-secondary'} hover:text-primary`}
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