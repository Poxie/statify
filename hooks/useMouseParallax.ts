import { RefObject, useEffect } from "react";
import { useIsSmallScreen } from "./useIsSmallScreen";

type Options = {
    cancelOnSmallScreens: boolean;
    maxTranslationX: number;
    maxTranslationY: number;
    parallax: number;
}

const DEFAULT_CANCEL_ON_SMALL_SCREENS = true;
const DEFAULT_MAX_TRANSLATION_X = 5;
const DEFAULT_MAX_TRANSLATION_Y = 1;
const DEFAULT_PARALLAX = 10;
export const useMouseParallax = (ref: RefObject<HTMLDivElement>, options: Partial<Options>={}) => {
    if(!options.cancelOnSmallScreens) options.cancelOnSmallScreens = DEFAULT_CANCEL_ON_SMALL_SCREENS;
    if(!options.maxTranslationX) options.maxTranslationX = DEFAULT_MAX_TRANSLATION_X;
    if(!options.maxTranslationY) options.maxTranslationY = DEFAULT_MAX_TRANSLATION_Y;
    if(!options.parallax) options.parallax = DEFAULT_PARALLAX;

    const isSmallScreen = useIsSmallScreen();

    useEffect(() => {
        if(!ref.current) return;
        if(options.cancelOnSmallScreens && isSmallScreen) {
            ref.current.style.transform = '';
            return;
        }

        const onMouseMove = (e: MouseEvent) => {
            if(!ref.current || !options.parallax || !options.maxTranslationX || !options.maxTranslationY) return;

            const width = window.innerWidth;
            const height = window.innerHeight;
            const mouseXPos = e.clientX;
            const mouseYPos = e.clientY;

            const widthPart = width / 2;
            const relativeXPos = widthPart - mouseXPos;
            const translateXPercentage = relativeXPos / widthPart;

            const heightPart = height / 2;
            const relativeYPart = heightPart - mouseYPos;
            const translateYPercentage = relativeYPart / heightPart;

            ref.current.style.transform = `translateY(${translateYPercentage * -(options.maxTranslationY + options.parallax)}px) translateX(${translateXPercentage * -(options.maxTranslationY + options.parallax)}px)`;
        }

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, [isSmallScreen, options.maxTranslationX, options.maxTranslationY, options.parallax, options.cancelOnSmallScreens]);
}