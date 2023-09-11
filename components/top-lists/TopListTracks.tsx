import React from 'react';
import TopListTrack from './TopListTrack';
import TopListOrigin from './TopListOrigin';
import { ToplistInfo } from '@/hooks/useCountryTopList';

const INITIAL_INDEX = 6;
const PLACEHOLDER_COUNT = 10;
export default function TopListTracks({ tracks, playlistInfo, loading }: {
    loading: boolean;
    tracks: ToplistInfo['tracks'] | undefined;
    playlistInfo: ToplistInfo['playlistInfo'] | undefined;
}) {
    return(
        <div className="w-main max-w-main mx-auto">
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {tracks?.slice(0,15).map((track, key) => (
                    <TopListTrack 
                        track={track}
                        index={INITIAL_INDEX + key}
                        loading={loading}
                        small
                        key={track.id}
                    />
                ))}
                {!tracks && Array.from(Array(PLACEHOLDER_COUNT)).map((_,key) => (
                    <div
                        className="h-[184px]"
                        key={key}
                    />
                ))}
            </ul>
            <TopListOrigin 
                playlistInfo={playlistInfo}
                loading={loading}
            />
        </div>
    )
}