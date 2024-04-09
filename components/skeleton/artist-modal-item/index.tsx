export default function ArtistModalItemSkeleton() {
    return(
        <div className="flex gap-1">
            <div className="w-9 aspect-square rounded-md bg-tertiary" />
            <div className="flex flex-col gap-1">
                <div className="w-24 h-5 bg-tertiary rounded-md" />
                <div className="w-28 h-3 bg-tertiary rounded-md" />
            </div>
        </div>
    )
}