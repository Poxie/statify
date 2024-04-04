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

        document.addEventListener('focusin', handleClickOutside);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener('focusin', handleClickOutside);
        }
    }, [ref, allowedRef, onClickOutside]);
}