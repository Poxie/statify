import { SpotifyTrack } from "@/types";
import BaseResult from "./BaseResult";
import ResultImage from "./ResultImage";

export default function TrackResult({ item, onSelect }: {
    item: SpotifyTrack;
    onSelect: (item: SpotifyTrack) => void;
}) {
    const image = item.album.images.at(-1)?.url;
    const artists = item.artists.map(a => a.name);

    const artistsString = new Intl.ListFormat('en').format(artists);
    return(
        <BaseResult 
            onClick={() => onSelect(item)}
            className="flex gap-2"
        >
            <ResultImage 
                src={image}
            />
            <div className="flex-1 flex justify-between items-center">
                <div className="grid">
                    <span className="text-sm">
                        {item.name}
                    </span>
                    <span className="text-xs text-secondary">
                        with {artistsString}
                    </span>
                </div>
                <span className="text-xs text-secondary">
                    {item.popularity} popularity
                </span>
            </div>
        </BaseResult>
    )
}