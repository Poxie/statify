import { motion } from "framer-motion";
import { useCallback, useLayoutEffect, useRef } from "react";
import { SetMenuArgs, useMenu } from ".";
import { useClickOutside } from "@/hooks/useClickOutside";

const SPACE_FROM_ELEMENT = 8;
const MAX_SPACE_FROM_EDGE = 16;
export default function MenuContainer({ children, elementRef, position='left' }: {
    elementRef: SetMenuArgs['ref'];
    position: SetMenuArgs['position'];
    children: React.ReactNode;
}) {
    const { close } = useMenu();

    const containerRef = useRef<HTMLDivElement>(null);

    const adjustPosition = useCallback(() => {
        if(!containerRef.current || !elementRef.current) return;

        const rect = elementRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        let left = rect.left;
        if(position === 'right') {
            left = rect.left - containerRect.width + rect.width;
            if(left < MAX_SPACE_FROM_EDGE) {
                left = MAX_SPACE_FROM_EDGE;
            }
        }
        if(position === 'left') {
            const spaceOutsideViewport = (rect.left + containerRect.width) - window.innerWidth;
            if(spaceOutsideViewport > -MAX_SPACE_FROM_EDGE) {
                left = left - spaceOutsideViewport - MAX_SPACE_FROM_EDGE;
            }
        }

        const top = rect.top + rect.height + SPACE_FROM_ELEMENT;

        containerRef.current.style.left = `${left}px`;
        containerRef.current.style.top = `${top}px`
    }, [elementRef.current, position])
    useLayoutEffect(() => {
        adjustPosition();

        window.addEventListener('resize', adjustPosition);
        window.addEventListener('scroll', adjustPosition);
        return () => {
            window.removeEventListener('resize', adjustPosition);
            window.removeEventListener('scroll', adjustPosition);
        }
    }, [elementRef.current]);

    useClickOutside({
        ref: containerRef,
        onClickOutside: close,
    })
    return(
        <motion.div
            initial={{ opacity: 0, scale: .96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: .96 }}
            transition={{ duration: .15, bounce: false }}
            onAnimationComplete={adjustPosition}
            className="absolute pointer-events-auto"
            ref={containerRef}
        >
            {children}
        </motion.div>
    )
}