import clsx from "clsx";
import Image from "next/image";

export default function SpotifyImage({ src, width, height, className='' }: {
    className?: string;
    src?: string;
    width: number;
    height: number;
}) {
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