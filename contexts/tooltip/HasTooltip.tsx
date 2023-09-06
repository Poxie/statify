import { useEffect, useRef } from "react";
import { TooltipPosition, useTooltip } from ".";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";

export const HasTooltip: React.FC<{
    tooltip: string;
    children: React.ReactNode;
    className?: string;
    position?: TooltipPosition;
    hideOnSmallScreens?: boolean;
    onClick?: () => void;
    delay?: number;
}> = ({ children, className, onClick, hideOnSmallScreens, tooltip, position='top', delay=0 }) => {
    const isSmallScreen = useIsSmallScreen();
    const { setTooltip, close } = useTooltip();

    const ref = useRef<any>(null);
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const onMouseEnter = (bypassDelay?: boolean) => {
        if(isSmallScreen && hideOnSmallScreens) return;
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
        onClick,
        onMouseEnter: () => onMouseEnter(false),
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