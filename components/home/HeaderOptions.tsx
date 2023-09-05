"use client";
import { SpotifyArtist } from "@/types";
import Button from "../button";
import SearchInput from "../search-input";
import { useRouter } from "next/navigation";

export default function HeaderOptions() {
    const router = useRouter();
    return(
        <div className="max-w-[90%] mx-auto mt-6 flex flex-col items-center justify-center gap-3 md:flex-row">
            <SearchInput<SpotifyArtist> 
                onSelect={item => router.push(`/?a=${item.id}`, { scroll: false })}
                type={'artist'}
            />
            <span className="uppercase text-secondary text-xs font-semibold">
                or
            </span>
            <Button className="w-[400px] max-w-full md:w-[unset]">
                Explore now
            </Button>
        </div>
    )
}