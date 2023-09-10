import { SpotifyOwner } from "@/types";
import TopListSearch from "./TopListSearch";

export default function TopListHeader({ country, playlistName, owner, colors }: {
    country: string;
    owner: SpotifyOwner;
    playlistName: string;
    colors: string[] | undefined;
}) {
    const isTopList = playlistName.toLowerCase().includes('top') && owner.display_name === 'Spotify';
    return(
        <div className="w-[600px] max-w-main mx-auto text-center">
            <h1 className="text-4xl font-semibold">
                These are {isTopList ? 'the top' : 'some'} hits {country.toLowerCase() === 'global' ? (
                    'globally'
                ) : (
                    <>
                    in{' '}
                    <span 
                        className="gradient-text font-extrabold"
                        style={colors ? { '--gradient-from': colors[0], '--gradient-to': colors[1] } as React.CSSProperties : undefined}
                    >
                        {country}
                    </span>
                    </>
                )}
            </h1>
            <span className="block mt-4 mb-6 sm:text-xl text-secondary">
                It is time to leave your country’s bubble. This is a way to explore the culture of countries all around the world.
            </span>
            <TopListSearch />
        </div>
    )
}