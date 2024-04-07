export default function ProfileTopItemSkeleton() {
    return(
        <div className="flex gap-2">
            <div className="w-24 aspect-square bg-secondary rounded-md" />
            <div className="flex flex-col gap-1">
                <div className="w-40 h-7 bg-secondary rounded-md" />
                <div className="w-28 h-4 bg-secondary rounded-md" />
            </div>
        </div>
    )
}