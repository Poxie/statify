"use client";

import { useScreenSize } from "@/hooks/useScreenSize";
import { useEffect, useRef } from "react";

const PARALLAX_INDEX_LARGE = 1.9;
const PARALLAX_INDEX_SMALL = 1.6;
const SCROLL_OFFSET = 100;
const OPACITY_LOWER_AT = 200;
export default function HeaderTranslateContainer({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) {
    const screenSize = useScreenSize();
    const isSmallScreen = ['xs', 'sm'].includes(screenSize);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => {
            if(!ref.current) return;

            const scroll = window.scrollY;
            const translate = scroll / (isSmallScreen ? PARALLAX_INDEX_SMALL : PARALLAX_INDEX_LARGE);

            let opacity = 1;
            if(scroll < OPACITY_LOWER_AT) {
                opacity = 1;
            } else if(scroll > ref.current.offsetHeight - SCROLL_OFFSET) {
                opacity = 0;
            } else {
                opacity = 1 - (scroll - OPACITY_LOWER_AT) / (ref.current.offsetHeight - SCROLL_OFFSET - OPACITY_LOWER_AT);
            }
            
            if(opacity > 0) ref.current.style.transform = `translateY(${translate}px)`;
            ref.current.style.opacity = String(opacity);
        }
        onScroll();

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [isSmallScreen]);

    return(
        <div 
            style={{ transform: 'translateY(0)' }}
            className={className}
            ref={ref}
        >
            {children}
        </div>
    )
}