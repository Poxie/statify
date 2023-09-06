import { useEffect, useRef } from "react";
import { TooltipPosition, useTooltip } from ".";

export const HasTooltip: React.FC<{
    tooltip: string;
    children: React.ReactNode;
    className?: string;
    position?: TooltipPosition;
    onClick?: () => void;
    delay?: number;
}> = ({ children, className, onClick, tooltip, position='top', delay=0 }) => {
    const { setTooltip, close } = useTooltip();
    const ref = useRef<any>(null);
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const onMouseEnter = (bypassDelay?: boolean) => {
        timeout.current = setTimeout(() => {
            setTooltip({ tooltip, position }, ref);
        }, bypassDelay ? 0 : delay);
    }
    const onMouseLeave = () => {
        if(timeout.current) {
            clearTimeout(timeout.current);
            timeout.current = null;
        }
        close();
    }

    // Closing and cancelling on unmount
    useEffect(() => {
        return () => {
            if(timeout.current) clearTimeout(timeout.current);
            close();
        }
    }, []);

    const props = {
        className,
        onMouseLeave,
        onMouseEnter: () => onMouseEnter(false),
        onClick: () => {
            onMouseEnter(true);
            if(onClick) onClick();
        },
        'aria-label': tooltip,
        ref,
    }

    return(
        onClick ? (
            <button {...props}>
                {children}
            </button>
        ) : (
            <div {...props}>
                {children}
            </div>
        )
    )
}