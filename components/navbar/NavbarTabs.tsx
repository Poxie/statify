"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
    { text: 'Home', path: '/' },
    { text: 'Top lists', path: '/top-lists' },
    { text: 'Explore', path: '/explore' },
    { text: 'Profile', path: '/profile' },
]
export default function NavbarTabs() {
    const pathname = usePathname();
    return(
        <ul className="flex gap-3">
            {TABS.map(tab => (
                <li key={tab.path}>
                    <Link 
                        href={tab.path}
                        className={`text-xs transition-colors ${tab.path === pathname ? 'text-primary' : 'text-secondary'} hover:text-primary`}
                    >
                        {tab.text}
                    </Link>
                </li>
            ))}
        </ul>
    )
}