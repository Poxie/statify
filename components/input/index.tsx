import React from 'react';
import clsx from "clsx";

const Input = React.forwardRef<HTMLInputElement, {
    containerClassName?: string;
    iconClassName?: string;
    className?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    defaultValue?: string;
    onChange?: (text: string) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}>(({
    containerClassName,
    iconClassName,
    className,
    placeholder,
    icon,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
}, ref) => {
    return(
        <div 
            className={clsx(
                "flex outline-1 outline-white focus-within:outline bg-secondary border-[1px] border-tertiary rounded-lg",
                containerClassName,
            )}
        >
            {icon && (
                <div className={clsx(
                    "pl-3 flex items-center",
                    iconClassName,
                )}>
                    {icon}
                </div>
            )}
            <input 
                type="text"
                className={clsx(
                    "py-3 px-4 flex-1 bg-transparent outline-none placeholder:text-secondary",
                    className,
                )}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={e => {
                    if(!onChange) return;
                    onChange(e.target.value);
                }}
                ref={ref}
            />
        </div>
    )
})
Input.displayName = 'Input';

export default Input;