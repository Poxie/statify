"use client";
import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ComboContext = React.createContext<null | {
    increaseCombo: (artistId: string) => void;
    cancelCombo: () => void;
}>(null);

export const useCombo = () => {
    const context = React.useContext(ComboContext);
    if(!context) throw new Error('Component is not wrapped in combo provider.');
    return context;
}

const SHOW_COMBO_AT = 2;
const ANIMATION_DELAY = 300;
const TIME_BEFORE_LOSS = 2500;
const LESS_TIME_PER_ROUND = 40;
const WAIT_BEFORE_RESTART = 2500;
export default function ComboProvider({ children }: {
    children: React.ReactNode;
}) {
    const combo = useRef(0);
    const [personalBest, setPersonalBest] = useState(0);
    const [comboText, setComboText] = useState(`Current combo ${combo.current}`);
    const [enlargeAnimation, setEnlargeAnimation] = useState(false);
    const prevArtistId = useRef<null | string>(null);
    const comboTimer = useRef<null | NodeJS.Timeout>(null);
    const gameEnded = useRef(false);

    const endGame = () => {
        let personalBest = Number(window.localStorage.getItem('combo-pb'));
        if(!personalBest || combo.current >= personalBest) {
            personalBest = combo.current;
            window.localStorage.setItem('combo-pb', String(personalBest));
        }
        setPersonalBest(personalBest);

        gameEnded.current = true;
        setComboText(`Total combo achieved: ${combo.current}`);

        setTimeout(() => {
            combo.current = 0;
            gameEnded.current = false;
            prevArtistId.current = null;
            setComboText(`Current combo ${combo.current}`);
        }, WAIT_BEFORE_RESTART);
    }
    const increaseCombo = (artistId: string) => {
        if(artistId === prevArtistId.current) return;
        if(gameEnded.current) return;

        prevArtistId.current = artistId;
        
        combo.current += 1;
        setComboText(`Current combo ${combo.current}`);
        setEnlargeAnimation(true);
        setTimeout(() => {
            setEnlargeAnimation(false);
        }, ANIMATION_DELAY);

        if(comboTimer.current) clearTimeout(comboTimer.current);
        if(combo.current >= SHOW_COMBO_AT) {
            comboTimer.current = setTimeout(endGame, (TIME_BEFORE_LOSS - LESS_TIME_PER_ROUND * combo.current));
        }
    }
    const cancelCombo = () => {
        if(combo.current >= SHOW_COMBO_AT) return endGame();
        combo.current = 0;
    }

    return(
        <ComboContext.Provider value={{ increaseCombo, cancelCombo }}>
        {children}
        <AnimatePresence>
            {combo.current >= SHOW_COMBO_AT && (
                <div className={`fixed z-40 top-12 sm:top-[calc(50%+64px)] left-2/4 -translate-y-2/4 -translate-x-2/4 text-2xl font-semibold transition-all ${enlargeAnimation ? 'scale-125' : ''}`}>
                    <motion.div
                        exit={{ translateY: 30, opacity: 0 }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ bounce: false }}
                    >
                        <span className={`block whitespace-nowrap ${enlargeAnimation ? 'animate-shake-large' : !gameEnded.current ? 'animate-shake-small' : ''}`}>
                            {comboText}
                        </span>
                        {gameEnded.current && (
                            <span className="block whitespace-nowrap text-xs text-center text-secondary mt-1">
                                Personal best: {personalBest}
                            </span>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
        </ComboContext.Provider>
    )
}