"use client";
import { useRouter, useSearchParams } from "next/navigation";
import CustomSearchInput from "../custom-search-input";
import ListInput from "../list-input";

export default function TopListHeader() {
    const router = useRouter();
    const country = useSearchParams().get('country');

    return(
        <div className="text-center max-w-main mx-auto">
            <h1 className="text-4xl font-semibold">
                These are some hits {!country ? (
                    'globally'
                ) : (
                    <>
                    in{' '}
                    <span>
                        {country}
                    </span>
                    </>
                )}
            </h1>
            <span className="block w-[600px] max-w-full mx-auto  mt-4 mb-6 sm:text-xl text-secondary">
                It is time to leave your country’s bubble. This is a way to explore the culture of countries all around the world.
            </span>
            <ListInput 
                path='/country/list'
                placeholder={'Find your country...'}
                onSelect={country => router.push(`/top-lists?country=${country}`)}
            />
        </div>
    )
}