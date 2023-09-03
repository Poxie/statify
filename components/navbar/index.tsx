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
            <div className="flex items-center gap-4">
                <Link 
                    className="z-30 flex items-center gap-3"
                    aria-label={'Go home'}
                    href={'/'}
                >
                    <LogoIcon className="w-7" />
                </Link>
                <button 
                    onClick={toggle}
                    className="z-30 md:hidden transition-colors duration-300 hover:bg-tertiary p-1 -ml-2 rounded-md"
                    aria-label={'Toggle navbar navigation'}
                >
                    <HamIcon className="w-6" />
                </button>
                <NavbarTabs 
                    open={open} 
                    toggle={toggle}
                    isSmallScreen={isSmallScreen}
                />
            </div>
            <Button 
                small={isSmallScreen}
                className="z-30"    
            >
                Sign in with Spotify
            </Button>
        </div>
    )
}