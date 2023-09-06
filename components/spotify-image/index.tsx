import clsx from "clsx";
import Image from "next/image";

export type SpotifyImageProps = {
    className?: string;
    src?: string;
    width: number;
    height: number;
}
export default function SpotifyImage({ src, width, height, className='' }: SpotifyImageProps) {
    return(
        <div 
            className={clsx(
                "flex items-center justify-center aspect-square bg-tertiary rounded-md overflow-hidden",
                className,
            )}
        >
            {src ? (
                <Image 
                    className="object-cover w-full h-full"
                    src={src}
                    width={width}
                    height={height}
                    alt=""
                />
            ) : (
                <span>
                    ?
                </span>
            )}
        </div>
    )
}