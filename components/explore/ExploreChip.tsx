import { CloseIcon } from "@/assets/icons/CloseIcon";
import SpotifyImage from "../spotify-image";

export default function ExploreChip({ id, text, image, onRemove }: {
    id: string;
    text: string;
    image?: string;
    onRemove?: () => void;
}) {
    return(
        <div className="p-2 flex items-center gap-2 rounded-md bg-tertiary">
            {image && (
                <SpotifyImage 
                    className="w-5 aspect-square rounded-full"
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
                    className="p-1 -mx-1"
                    onClick={onRemove}
                >
                    <CloseIcon className="w-3" />
                </button>
            )}
        </div>
    )
}