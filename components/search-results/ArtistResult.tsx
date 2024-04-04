import { SpotifyArtist } from "@/types";
import BaseResult from "./BaseResult";
import SpotifyImage from "../spotify-image";
import ResultImage from "./ResultImage";

export default function ArtistResult({ item, onSelect }: {
    item: SpotifyArtist;
    onSelect: (item: SpotifyArtist) => void;
}) {
    const image = item.images.at(-1)?.url;
    return(
        <BaseResult 
            onClick={() => onSelect(item)}
            className="flex items-center gap-2"
        >
            <ResultImage 
                src={image}
            />
            <div className="grid">
                <span className="text-sm">
                    {item.name}
                </span>
                <span className="text-xs text-secondary">
                    {item.followers.total.toLocaleString()} followers
                </span>
            </div>
        </BaseResult>
    )
}