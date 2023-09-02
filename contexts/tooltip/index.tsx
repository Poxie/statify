"use client";
import React, { ReactElement, RefObject, useRef, useState } from "react"
import { AnimatePresence } from "framer-motion";
import { Tooltip } from "./Tooltip";

export type TooltipPosition = 'top' | 'bottom';
export type Context = {
    setTooltip: (options: {
        tooltip: ReactElement | string;
        position?: TooltipPosition;
    }, ref: RefObject<HTMLDivElement>) => void;
    close: () => void;
}

const TooltipContext = React.createContext({} as Context);

export const useTooltip = () => React.useContext(TooltipContext);

export default function TooltipProvider({ children }: {
    children: React.ReactNode;
}) {
    const [tooltip, setTooltip] = useState<{ id: number, tooltip: React.ReactNode } | null>(null);
    const [position, setPosition] = useState<TooltipPosition>('top');
    const refElement = useRef<HTMLDivElement | null>(null);

    const _setTooltip: Context['setTooltip'] = (options, ref) => {
        const { tooltip, position='top' } = options;

        setTooltip({ id: Math.random(), tooltip });
        setPosition(position);
        refElement.current = ref.current;

        window.addEventListener('scroll', close);
    }

    const close = () => {
        setTooltip(null);
        setPosition('top');
        refElement.current = null;

        window.removeEventListener('scroll', close);
    }

    const value = {
        setTooltip: _setTooltip,
        close
    }
    return(
        <TooltipContext.Provider value={value}>
            {children}

            <AnimatePresence>
                {tooltip?.tooltip && (
                    <Tooltip
                        position={position}
                        refElement={refElement}
                        key={tooltip.id}
                    >
                        {tooltip.tooltip}
                    </Tooltip>
                )}
            </AnimatePresence>
        </TooltipContext.Provider>
    )
}