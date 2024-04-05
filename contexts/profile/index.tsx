"use client";
import { SpotifyArtist, SpotifyTrack } from '@/types';
import { getWithToken } from '@/utils';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';

const ProfileContext = React.createContext<null | {
    loading: boolean;
    artists: SpotifyArtist[];
    tracks: SpotifyTrack[];
}>(null);

export const useProfile = () => {
    const context = React.useContext(ProfileContext);
    if(!context) {
        throw new Error('useProfile must be used within an ProfileProvider');
    }
    return context;
}

export default function ProfileProvider({ children }: {
    children: React.ReactNode;
}) {
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState<{
        artists: SpotifyArtist[];
        tracks: SpotifyTrack[];
    }>({
        artists: [],
        tracks: [],
    })

    useEffect(() => {
        if(!user) return;

        const reqs = [
            getWithToken<SpotifyArtist[]>('/profile/me/artists'),
            getWithToken<SpotifyTrack[]>('/profile/me/tracks'),
        ]

        Promise.all(reqs)
            .then(([artists, tracks]) => {
                setInfo({ 
                    artists: artists as SpotifyArtist[], 
                    tracks: tracks as SpotifyTrack[], 
                });
            })
            .finally(() => {
                setLoading(false);
            })
    }, [user]);
    
    const value = {
        loading,
        artists: info.artists,
        tracks: info.tracks,
    }
    return(
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}