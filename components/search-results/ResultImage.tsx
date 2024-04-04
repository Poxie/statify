import SpotifyImage from "../spotify-image";

export default function ResultImage({ src }: {
    src: string | undefined;
}) {
    return(
        <SpotifyImage 
            height={120}
            width={120}
            src={src}
            className="w-9"
        />
    )
}