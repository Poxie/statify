"use client";
import { useAuth } from "@/contexts/auth";
import { getLoginUrl } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const { user, loading } = useAuth();

    useEffect(() => {
        if(loading) return;

        const token = window.location.hash.split('=').at(1)?.split('&')?.at(0);
        if(!user) {
            if(!token) {
                router.replace(getLoginUrl());
            } else {
                localStorage.setItem('token', token);
                window.location.replace('/profile');
            }
        }
    }, [user, loading]);

    if(!user && !loading) {
        return null;
    }

    return children;
}