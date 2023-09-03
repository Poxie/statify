import { useEffect, useState } from "react"

const SM = 640;
const MD = 768;
const LG = 1024;
const XL = 1280;
const XXL = 1536;

export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const useScreenSize = () => {
    const [size, setSize] = useState<ScreenSize>('xxl');

    useEffect(() => {
        const onResize = () => {
            const width = window.innerWidth;
            if(width > XXL) return setSize('xxl');
            if(width > XL) return setSize('xl');
            if(width > LG) return setSize('lg');
            if(width > MD) return setSize('md');
            if(width > SM) return setSize('sm');
            return setSize('xs');
        }
        onResize();

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return size;
}