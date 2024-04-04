"use client";
import { SpotifyArtist } from '@/types';
import { getWithToken } from '@/utils';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';

const ProfileContext = React.createContext<null | {
    loading: boolean;
    artists: SpotifyArtist[];
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
    const [artists, setArtists] = useState<SpotifyArtist[]>([]);

    useEffect(() => {
        if(!user) return;

        getWithToken<SpotifyArtist[]>('/profile/me/artists')
            .then(artists => {
                setArtists(artists);
                setLoading(false);
            })
    }, [user]);
    
    const value = {
        loading,
        artists,
    }
    return(
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}