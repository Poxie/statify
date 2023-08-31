export default function Input({
    containerClassName='',
    className='',
    placeholder,
    icon,
    defaultValue,
    onChange,
}: {
    containerClassName?: string;
    className?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    defaultValue?: string;
    onChange?: (text: string) => void;
}) {
    return(
        <div className={`focus-within:outline outline-1 outline-white flex bg-secondary border-[1px] border-tertiary rounded-lg ${containerClassName}`}>
            {icon && (
                <div className="flex items-center pl-3">
                    {icon}
                </div>
            )}
            <input 
                type="text"
                className={`placeholder:text-secondary bg-transparent outline-none py-3 px-4 ${className}`}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={e => {
                    if(!onChange) return;
                    onChange(e.target.value);
                }}
            />
        </div>
    )
}