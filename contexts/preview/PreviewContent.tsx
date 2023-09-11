import React from 'react';
import PreviewControls from './PreviewControls';
import PreviewVolume from './PreviewVolume';
import PreviewTrack from './PreviewTrack';
import PreviewExpander from './PreviewExpander';

export default function PreviewContent() {
    return(
        <div className="p-4 grid items-center gap-3 grid-cols-3">
            <PreviewTrack />
            <PreviewControls />
            <div className="col-span-3 sm:col-span-1 flex items-start justify-end gap-5">
                <PreviewVolume />
                <PreviewExpander />
            </div>
        </div>
    )
}