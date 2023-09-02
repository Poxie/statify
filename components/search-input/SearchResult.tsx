import Image from "next/image";
import SpotifyImage from "../spotify-image";

export default function SearchResult({ name, image, extraText, onSelect }: {
    name: string;
    image: string;
    extraText: string;
    onSelect: () => void;
}) {
    return(
        <li>
            <button 
                className="p-2 text-left w-full flex items-center gap-2 transition-colors hover:bg-tertiary rounded-lg"
                onClick={onSelect}
            >
                <SpotifyImage
                    className="w-9"
                    src={image}
                    width={36}
                    height={36}
                />
                <div className="grid">
                    <span className="text-sm">
                        {name}
                    </span>
                    <span className="text-xs text-secondary">
                        {extraText}
                    </span>
                </div>
            </button>
        </li>
    )
}