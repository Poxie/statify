import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";
import Button from "../button";
import { useAuth } from "@/contexts/auth";
import SpotifyImage from "../spotify-image";
import { getLoginUrl } from "@/utils";

export default function NavbarUser() {
    const { user, loading } = useAuth();
    const isSmallScreen = useIsSmallScreen();

    if(loading) return null;

    const image = user?.images.at(-1)?.url;
    return(
        user ? (
            <div className="flex items-center gap-2">
                <SpotifyImage 
                    src={image}
                    height={64}
                    width={64}
                    className="w-7"
                />
                <span>
                    {user.display_name}
                </span>
            </div>
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