export default function ProfileIndexLabel({ index }: {
    index: number;
}) {
    return(
        <span className="py-1.5 px-3 z-10 absolute top-0 left-0 bg-secondary bg-opacity-70 border-2 border-tertiary rounded-br-lg rounded-tl-lg font-bold text-sm pointer-events-none">
            #{index}
        </span>
    )
}