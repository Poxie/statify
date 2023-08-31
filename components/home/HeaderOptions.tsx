"use client";

import { SearchIcon } from "@/assets/icons/SearchIcon";
import Input from "../input";
import Button from "../button";

export default function HeaderOptions() {
    return(
        <div className="flex items-center justify-center gap-3 mt-6">
            <Input
                containerClassName={'w-[400px]'}
                icon={<SearchIcon className="w-5 text-secondary" />}
                placeholder={'Search artist or song...'}
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