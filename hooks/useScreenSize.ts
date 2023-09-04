import { SCREEN_LG, SCREEN_MD, SCREEN_SM, SCREEN_XL, SCREEN_XXL } from "@/utils/constants";
import { useEffect, useState } from "react"

export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const useScreenSize = () => {
    const [size, setSize] = useState<ScreenSize>('xxl');

    useEffect(() => {
        const onResize = () => {
            const width = window.innerWidth;
            if(width > SCREEN_XXL) return setSize('xxl');
            if(width > SCREEN_XL) return setSize('xl');
            if(width > SCREEN_LG) return setSize('lg');
            if(width > SCREEN_MD) return setSize('md');
            if(width > SCREEN_SM) return setSize('sm');
            return setSize('xs');
        }
        onResize();

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return size;
}