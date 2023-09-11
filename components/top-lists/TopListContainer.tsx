"use client";
import TopListPopularTracks from "./TopListPopularTracks";
import TopListTracks from "./TopListTracks";
import { useSearchParams } from "next/navigation";
import { useCountryTopList } from "@/hooks/useCountryTopList";

const EXTRA_ANIMATION_DURATION = 250;
export default function TopListContainer() {
    const country = useSearchParams().get('country') || 'global';

    const { loading, info } = useCountryTopList(country, { extraDuration: EXTRA_ANIMATION_DURATION });
    
    return(
        <>
        <TopListPopularTracks 
            tracks={info?.tracks.slice(0,5)}
            loading={loading}
        />
        <TopListTracks 
            tracks={info?.tracks.slice(5)}
            playlistInfo={info?.playlistInfo}
            loading={loading}
        />
        </>
    )
}