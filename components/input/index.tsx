import clsx from "clsx";

export default function Input({
    containerClassName='',
    className='',
    placeholder,
    icon,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
}: {
    containerClassName?: string;
    className?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    defaultValue?: string;
    onChange?: (text: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}) {
    return(
        <div className={clsx(
            "flex outline-1 outline-white focus-within:outline bg-secondary border-[1px] border-tertiary rounded-lg",
            containerClassName,
        )}>
            {icon && (
                <div className="pl-3 flex items-center">
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
            />
        </div>
    )
};
Input.displayName = 'Input';