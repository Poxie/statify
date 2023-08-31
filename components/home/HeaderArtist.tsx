import Image from "next/image";
import Link from "next/link";

export default function HeaderArtist({
    id,
    image,
    top,
    left,
    right,
}: {
    id: string;
    image: string;
    top: number;
    left?: number;
    right?: number;
}) {
    return(
        <Link
            href={`/?a=${id}`} 
            className="absolute w-16 aspect-square"
            style={{
                top: `${top}px`,
                left: left ? `${left}px` : 'unset',
                right: right ? `${right}px` : 'unset',
            }}
        >
            <Image 
                className="duration-500ms transition-[border-radius] rounded-[30px] hover:rounded-xl object-cover w-full h-full"
                src={image}
                width={100}
                height={100}
                alt={``}
            />
        </Link>
    )
}