import { twMerge } from 'tailwind-merge';
import { CloseIcon } from "@/assets/icons/CloseIcon";
import SpotifyImage from "../spotify-image";

export default function ExploreChip({ id, text, image, onRemove, className }: {
    id: string;
    text: string;
    image?: string;
    onRemove?: () => void;
    className?: string;
}) {
    return(
        <div className={twMerge(
            "p-2 flex items-center gap-2 rounded-md bg-tertiary",
            className,
        )}>
            {image && (
                <SpotifyImage 
                    className="w-4 aspect-square rounded-sm"
                    src={image}
                    width={32}
                    height={32}
                />
            )}
            <span className="text-xs font-semibold">
                {text}
            </span>
            {onRemove && (
                <button 
                    className="p-1 -m-1"
                    onClick={onRemove}
                >
                    <CloseIcon className="w-3" />
                </button>
            )}
        </div>
    )
}