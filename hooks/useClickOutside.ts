import { RefObject, useEffect } from "react";

export const useClickOutside = ({ ref, allowedRef, onClickOutside }: {
    ref: RefObject<HTMLElement>;
    allowedRef?: RefObject<HTMLElement>;
    onClickOutside: () => void;
}) => {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent | FocusEvent) => {
            if(ref.current && (!ref.current.contains(e.target as Node))) {
                if(allowedRef?.current && !allowedRef.current.contains(e.target as Node)) {
                    return;
                }
                onClickOutside();
            }
        }
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === 'Escape') {
                onClickOutside();
            }
        }

        document.addEventListener('focusin', handleClickOutside);
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener('focusin', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [ref, allowedRef, onClickOutside]);
}