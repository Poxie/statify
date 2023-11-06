import Image from "next/image";
import SpotifyImage from "../spotify-image";
import { SpotifyArtist, SpotifyTrack } from "@/types";

export default function SearchResult(props: {
    onSelect: () => void;
} & (SpotifyTrack | SpotifyArtist)) {
    const name = props.name;
    let image: string | undefined;
    let extraText = '';

    if('images' in props) {
        image = props.images.at(-1)?.url;
        extraText = `${props.followers.total.toLocaleString()} followers`;
    } else if('album' in props) {
        image = props.album.images.at(-1)?.url;
        extraText = `with ${props.artists[0].name}`;
    }
    return(
        <li>
            <button 
                className="p-2 w-full flex items-center gap-2 text-left rounded-lg transition-colors hover:bg-tertiary"
                onClick={props.onSelect}
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