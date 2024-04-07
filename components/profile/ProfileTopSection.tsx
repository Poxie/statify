export default function ProfileTopSection({ children }: {
    children: React.ReactNode;
}) {
    return(
        <ul className="p-7 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-3 items-end bg-dotted bg-[length:31px_31px] bg-center">
            {children}
        </ul>
    )
}