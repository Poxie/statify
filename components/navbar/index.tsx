import Link from "next/link";
import Button from "../button";
import NavbarTabs from "./NavbarTabs";
import { LogoIcon } from "@/assets/icons/LogoIcon";

export default function Navbar() {
    return(
        <div className="w-main max-w-main mx-auto py-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <Link 
                    className="flex items-center gap-3"
                    aria-label={'Go home'}
                    href={'/'}
                >
                    <LogoIcon className="w-7" />
                    <span>
                        Statify
                    </span>
                </Link>
                <NavbarTabs />
            </div>
            <Button>
                Sign in with Spotify
            </Button>
        </div>
    )
}