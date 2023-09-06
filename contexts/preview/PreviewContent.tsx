import React from 'react';
import PreviewControls from './PreviewControls';
import PreviewVolume from './PreviewVolume';
import PreviewTrack from './PreviewTrack';

export default function PreviewContent() {
    return(
        <div className="grid items-center gap-3 grid-cols-3">
            <PreviewTrack />
            <PreviewControls />
            <PreviewVolume />
        </div>
    )
}