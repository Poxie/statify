"use client";
import { SpotifyArtist } from "@/types";
import Button from "../button";
import SearchInput from "../search-input";
import { useRouter } from "next/navigation";

export default function HeaderOptions() {
    const router = useRouter();
    return(
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-6 mx-auto max-w-main">
            <SearchInput<SpotifyArtist> 
                onSelect={item => router.push(`/?a=${item.id}`, { scroll: false })}
                type={'artist'}
            />
            <span className="uppercase text-secondary text-xs font-semibold">
                or
            </span>
            <Button className="max-w-full w-[400px] md:w-[unset]">
                Explore now
            </Button>
        </div>
    )
}