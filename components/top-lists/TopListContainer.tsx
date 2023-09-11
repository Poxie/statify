"use client";
import TopListPopularTracks from "./TopListPopularTracks";
import TopListTracks from "./TopListTracks";
import { useEffect, useState } from "react";
import { SpotifyOwner, SpotifyPlaylist } from "@/types";
import { get } from "@/utils";
import { useSearchParams } from "next/navigation";

const OPACITY_ANIMATION_DURATION = 250;
export default function TopListContainer() {
    const country = useSearchParams().get('country') || 'global';

    const [opacityZero, setOpacityZero] = useState(false);
    const [info, setInfo] = useState<{
        tracks: SpotifyPlaylist['tracks']['items'][number]['track'][];
        playlistInfo: {
            href: string;
            name: string;
            owner: SpotifyOwner;
        };
    } | null>(null);

    useEffect(() => {
        setOpacityZero(true);

        const abortController = new AbortController();
        const req = get<NonNullable<typeof info>>(`/top-lists/${country}`, abortController.signal);
    
        const timeouts: NodeJS.Timeout[] = [];
        timeouts.push(setTimeout(() => {
            req.then(info => {
                setInfo(info);
                timeouts.push(setTimeout(() => {
                    setOpacityZero(false);
                }, OPACITY_ANIMATION_DURATION));
            })
        }, OPACITY_ANIMATION_DURATION));

        return () => {
            abortController.abort();
            timeouts.forEach(clearTimeout);
        }
    }, [country]);
    
    return(
        <>
        <TopListPopularTracks 
            tracks={info?.tracks.slice(0,5)}
            opacityZero={opacityZero}
        />
        <TopListTracks 
            tracks={info?.tracks.slice(5)}
            playlistInfo={info?.playlistInfo}
            opacityZero={opacityZero}
        />
        </>
    )
}