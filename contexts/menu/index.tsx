"use client";
import React, { createContext, useContext, useState } from "react";
import MenuContainer from "./MenuContainer";
import { AnimatePresence } from "framer-motion";

export type SetMenuArgs = {
    menu: React.ReactNode;
    ref: React.RefObject<HTMLElement>;
    position?: 'left' | 'right';
}

const MenuContext = createContext<null | {
    setMenu: (menuArgs: SetMenuArgs) => void;
    close: () => void;
}>(null);

export const useMenu = () => {
    const context = useContext(MenuContext);
    if(!context) {
        throw new Error("useMenu must be used within a MenuProvider");
    }
    return context;
}

export default function MenuProvider({ children }: {
    children: React.ReactNode;
}) {
    const [menu, setMenu] = useState<null | SetMenuArgs>(null);

    const close = () => setMenu(null);

    const value = {
        setMenu,
        close,
    }
    return(
        <MenuContext.Provider value={value}>
            {children}
            <div className="w-full h-full fixed top-0 left-0 pointer-events-none">
                <AnimatePresence>
                    {menu && (
                        <MenuContainer 
                            elementRef={menu.ref}
                            position={menu.position}
                        >
                            {menu.menu}
                        </MenuContainer>
                    )}
                </AnimatePresence>
            </div>
        </MenuContext.Provider>
    )
}