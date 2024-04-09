"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const ModalContext = React.createContext<null | {
    openModal: (content: React.ReactNode) => void;
    goBack: () => void;
}>(null);

export const useModal = () => {
    const context = React.useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}

export default function ModalProvider({ children }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const [modals, setModals] = useState<{
        content: React.ReactNode;
        id: string;
    }[]>([]);

    // Close all modals when navigating
    useEffect(() => {
        setModals([]);
    }, [pathname]);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === 'Escape') {
                goBack();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);
    useEffect(() => {
        if(modals.length > 0) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [modals.length]);

    const goBack = () => {
        setModals(prev => prev.slice(0, -1));
    }
    const openModal = (content: React.ReactNode) => {
        const modal = {
            id: Math.random().toString(),
            content,
        }
        setModals(prev => prev.concat(modal));
    }

    const activeModal = modals.at(-1);

    const value = {
        openModal,
        goBack,
    }
    return(
        <ModalContext.Provider value={value}>
            {children}
            <div className="w-full h-full z-40 fixed top-0 left-0 pointer-events-none">
                <AnimatePresence>
                    {activeModal && (
                        <motion.div 
                            className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-75 pointer-events-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: .2, bounce: false }}
                            onClick={goBack}
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence mode="wait">
                    {activeModal && (
                        <motion.div
                            key={activeModal.id}
                            className="scrollbar scrollbar-light w-[500px] max-w-full max-h-[100dvh] sm:max-h-[80dvh] absolute top-2/4 left-2/4 translate-x-2/4 translate-y-2/4 bg-primary rounded-lg pointer-events-auto overflow-auto"
                            initial={{ opacity: 0, scale: .8, translateX: '-50%', translateY: '-50%' }}
                            animate={{ opacity: 1, scale: 1, translateX: '-50%', translateY: '-50%'  }}
                            exit={{ opacity: 0, scale: .8, translateX: '-50%', translateY: '-50%'  }}
                            transition={{ duration: .2, bounce: false }}
                        >
                            {activeModal.content}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </ModalContext.Provider>
    )
}