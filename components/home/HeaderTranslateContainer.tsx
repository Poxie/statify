"use client";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import { useRef } from "react";

export default function HeaderTranslateContainer({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    useScrollParallax(ref);
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