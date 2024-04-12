import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";
import Button from "../button";
import { useAuth } from "@/contexts/auth";
import SpotifyImage from "../spotify-image";
import { getLoginUrl } from "@/utils";
import { useMenu } from "@/contexts/menu";
import ProfileMenu from "@/menus/profile";
import { useRef } from "react";
import NavbarProfileSkeleton from "../skeleton/navbar-profile";

export default function NavbarUser() {
    const { setMenu } = useMenu();
    const { user, loading, token } = useAuth();
    const isSmallScreen = useIsSmallScreen();

    const ref = useRef<HTMLButtonElement>(null);
    
    if(token && loading) {
        return <NavbarProfileSkeleton />
    }

    const openProfileMenu = () => {
        setMenu({
            menu: <ProfileMenu />,
            ref,
        })
    }

    const image = user?.images.at(-1)?.url;
    return(
        user ? (
            <button 
                className="p-2 -m-2 flex items-center gap-2 hover:bg-secondary transition-colors rounded-md" 
                onClick={openProfileMenu}
                ref={ref}
            >
                <SpotifyImage 
                    src={image}
                    height={64}
                    width={64}
                    className="w-7"
                />
                <span>
                    {user.display_name}
                </span>
            </button>
        ) : (
            <Button 
                href={getLoginUrl()}
                small={isSmallScreen}
                className="z-30 -my-2.5"
            >
                Sign in with Spotify
            </Button>
        )
    )
}