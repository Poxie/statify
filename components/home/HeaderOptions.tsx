"use client";
import { SpotifyArtist } from "@/types";
import Button from "../button";
import SearchInput from "../search-input";
import { useRouter } from "next/navigation";

export default function HeaderOptions() {
    const router = useRouter();
    return(
        <div className="flex items-center justify-center gap-3 mt-6">
            <SearchInput<SpotifyArtist> 
                onSelect={item => router.push(`/?a=${item.id}`)}
                type={'artist'}
            />
            <span className="uppercase text-secondary text-xs font-semibold">
                or
            </span>
            <Button>
                Explore now
            </Button>
        </div>
    )
}