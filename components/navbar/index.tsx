"use client";

import Link from "next/link";
import Button from "../button";
import NavbarTabs from "./NavbarTabs";
import { LogoIcon } from "@/assets/icons/LogoIcon";
import { HamIcon } from "@/assets/icons/HamIcon";
import { useState } from "react";
import { useScreenSize } from "@/hooks/useScreenSize";

export default function Navbar() {
    const screenSize = useScreenSize();
    const isSmallScreen = ['xs', 'sm'].includes(screenSize);

    const [open, setOpen] = useState(false);

    const toggle = () => {
        document.body.style.overflow = !open ? 'hidden' : '';
        setOpen(!open);
    }
    if(!isSmallScreen && open) {
        toggle();
    }
    return(
        <div className="w-main max-w-main mx-auto py-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <Link 
                    className="z-30 flex items-center gap-3"
                    aria-label={'Go home'}
                    href={'/'}
                >
                    <LogoIcon className="w-7" />
                    <span>
                        Statify
                    </span>
                </Link>
                <NavbarTabs 
                    open={open} 
                    toggle={toggle}
                    isSmallScreen={isSmallScreen}
                />
            </div>
            <div className="z-30 flex items-center gap-4">
                <Button small={isSmallScreen}>
                    Sign in with Spotify
                </Button>
                <button 
                    onClick={toggle}
                    className="md:hidden transition-colors duration-300 hover:bg-tertiary p-1 rounded-md"
                    aria-label={'Toggle navbar navigation'}
                >
                    <HamIcon className="w-6" />
                </button>
            </div>
        </div>
    )
}