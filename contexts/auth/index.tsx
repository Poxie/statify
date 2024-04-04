"use client";
import { SpotifyUser } from "@/types";
import { get, getWithToken } from "@/utils";
import React, { useEffect, useState } from "react";

const AuthContext = React.createContext<null | {
    loading: boolean;
    user: SpotifyUser | null;
    token: string | null;
}>(null);

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default function AuthProvider({ children }: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<SpotifyUser | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            setLoading(false);
            return;
        }
        
        getWithToken<SpotifyUser>('/profile/me')
            .then(user => {
                setUser(user);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const value = {
        loading,
        user,
        token,
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}