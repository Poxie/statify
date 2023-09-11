"use client";
import TopListSearch from "./TopListSearch";
import { getCountryColors } from "@/utils";
import { useSearchParams } from "next/navigation";

export default function TopListHeader() {
    const country = useSearchParams().get('country');

    const colors = getCountryColors(country);

    return(
        <div className="text-center max-w-main mx-auto">
            <h1 className="text-4xl font-semibold">
                These are some hits {!country ? (
                    'globally'
                ) : (
                    <>
                    in{' '}
                    <span 
                        className="gradient-text font-extrabold"
                        style={colors ? { '--gradient-from': colors[0], '--gradient-to': colors[1] } as React.CSSProperties : undefined}
                    >
                        {country}
                    </span>
                    </>
                )}
            </h1>
            <span className="block w-[600px] max-w-full mx-auto  mt-4 mb-6 sm:text-xl text-secondary">
                It is time to leave your country’s bubble. This is a way to explore the culture of countries all around the world.
            </span>
            <TopListSearch />
        </div>
    )
}