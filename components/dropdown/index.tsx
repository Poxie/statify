import { AnimatePresence, motion } from "framer-motion";
import { ArrowIcon } from "@/assets/icons/ArrowIcon";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useLayoutEffect, useRef, useState } from "react";

export default function Dropdown<T extends string>({ items, currentActiveId, onSelect, closeOnSelect=true }: {
    items: {
        id: T;
        text: string;
    }[];
    currentActiveId: string;
    onSelect: (itemId: T) => void;
    closeOnSelect?: boolean;
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLUListElement>(null);

    useLayoutEffect(() => {
        if(!menuOpen) return;

        const onResize = () => {
            if(!itemsRef.current) return;

            const { left, width } = itemsRef.current.getBoundingClientRect();
            if(left < 0) {
                itemsRef.current.style.right = '';
                itemsRef.current.style.left = `0px`;
            }
            if(left > width) {
                itemsRef.current.style.left = '';
                itemsRef.current.style.right = `0px`;
            }
        }
        onResize();

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [itemsRef.current, menuOpen]);

    const closeMenu = () => setMenuOpen(false);
    const toggleMenu = () => setMenuOpen(prev => !prev);

    const handleSelect = (id: T) => {
        onSelect(id);
        if(closeOnSelect) {
            closeMenu();
        }
    }

    useClickOutside({
        ref: containerRef,
        onClickOutside: closeMenu,
    })

    const active = items.find(item => item.id === currentActiveId);
    return(
        <div 
            className="relative"
            ref={containerRef}
        >
            <button 
                className="flex items-center gap-2 whitespace-nowrap text-secondary hover:text-primary transition-colors"
                onClick={toggleMenu}
            >
                {active?.text || 'Select an item'}
                <ArrowIcon className="w-4" />
            </button>
            <AnimatePresence>
                {menuOpen && (
                    <motion.ul 
                        className="min-w-[200px] p-2 z-10 absolute right-0 top-[calc(100%+.5rem)] bg-secondary shadow-2xl rounded-md"
                        initial={{ opacity: 0, scale: .96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: .96 }}
                        transition={{ duration: .2, bounce: false }}
                        ref={itemsRef}
                    >
                        {items.map(item => (
                            <li key={item.id}>
                                <button 
                                    onClick={() => handleSelect(item.id)}
                                    className="w-full py-1.5 px-2 text-left text-sm whitespace-nowrap rounded-md text-secondary hover:text-primary hover:bg-tertiary transition-colors"
                                >
                                    {item.text}
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}