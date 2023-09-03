"use client";

import { useEffect, useRef } from "react";

const PARALLAX_INDEX = 2.5;
const SCROLL_OFFSET = 100;
const OPACITY_LOWER_AT = 200;
export default function HeaderTranslateContainer({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => {
            if(!ref.current) return;

            const scroll = window.scrollY;
            const translate = scroll / PARALLAX_INDEX;
            ref.current.style.transform = `translateY(${translate}px)`;

            let opacity = 1;
            if(scroll < OPACITY_LOWER_AT) {
                opacity = 1;
            } else if(scroll > ref.current.offsetHeight - SCROLL_OFFSET) {
                opacity = 0;
            } else {
                opacity = 1 - (scroll - OPACITY_LOWER_AT) / (ref.current.offsetHeight - SCROLL_OFFSET - OPACITY_LOWER_AT);
            }
            
            ref.current.style.opacity = String(opacity);
        }

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return(
        <div 
            className={className}
            ref={ref}
        >
            {children}
        </div>
    )
}