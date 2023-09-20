import React from 'react';
import { twMerge } from 'tailwind-merge';

const Input = React.forwardRef<HTMLInputElement, {
    containerClassName?: string;
    iconContainerClassName?: string;
    className?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    defaultValue?: string;
    onChange?: (text: string) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}>(({
    containerClassName,
    iconContainerClassName,
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
            className={twMerge(
                "flex outline-1 outline-white focus-within:outline bg-secondary border-[1px] border-tertiary rounded-lg",
                containerClassName,
            )}
        >
            {icon && (
                <div className={twMerge(
                    "p-3 flex items-center",
                    iconContainerClassName,
                )}>
                    {icon}
                </div>
            )}
            <input 
                type="text"
                className={twMerge(
                    "py-3 px-4 flex-1 bg-transparent outline-none placeholder:text-secondary",
                    icon && 'pl-0',
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