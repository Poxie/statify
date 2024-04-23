import { SCREEN_MD } from "@/utils/constants";
import { useEffect, useState } from "react";

const getIsSmallScreen = () => {
    if(typeof window === 'undefined') return false;
    return window.innerWidth < SCREEN_MD;
}
export const useIsSmallScreen = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(getIsSmallScreen());

    useEffect(() => {
        const onResize = () => {
            setIsSmallScreen(getIsSmallScreen());
        }
        onResize();

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return isSmallScreen;
}