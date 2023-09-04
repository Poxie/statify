import { SCREEN_MD } from "@/utils/constants";
import { useEffect, useState } from "react";

export const useIsSmallScreen = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const onResize = () => {
            setIsSmallScreen(window.innerWidth < SCREEN_MD);
        }
        onResize();

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return isSmallScreen;
}