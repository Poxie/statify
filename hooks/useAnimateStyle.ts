import { CSSProperties, RefObject, useCallback, useEffect } from "react";

const DEFAULT_DURATION = 500;
export const useAnimateStyle = (ref: RefObject<HTMLElement | null>, isAnimated: boolean, options: {
    from: CSSProperties;
    to: CSSProperties;
    duration?: number;
    delayIn?: number;
    delayOut?: number;
}) => {
    if(options.duration === undefined) options.duration = DEFAULT_DURATION;

    useEffect(() => {
        if(!ref.current) return;

        ref.current.style.transitionDuration = `${options.duration}ms`;
        ref.current.style.transitionProperty = Object.keys(options.from).join(',');
    }, [ref.current]);
    useEffect(() => {
        if(!ref.current) return;

        // Determining and setting element transition delay
        const shouldHaveDelay = (isAnimated && options.delayOut) || (!isAnimated && options.delayIn);
        ref.current.style.transitionDelay = shouldHaveDelay ? `${shouldHaveDelay}ms` : '0ms';

        updateStyle(isAnimated ? options.from : options.to);
    }, [isAnimated]);
    const updateStyle = useCallback((style: CSSProperties) => {
        if(!ref.current) return;

        for(const [property, value] of Object.entries(style)) {
            ref.current.style[property as keyof Omit<CSSStyleDeclaration, 'length' | 'parentRule'>] = value;
        }
    }, [ref.current]);

    return {
        initialStyle: options.from,
    }
}