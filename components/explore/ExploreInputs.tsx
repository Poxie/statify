import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config';
import ExploreInput from "./ExploreInput";
import { SpotifyArtist, SpotifyTrack } from "@/types";

const background = resolveConfig(tailwindConfig).theme?.backgroundColor?.primary;

export default function ExploreInputs({ tracks, setTracks, artists, setArtists }: {
    tracks: SpotifyTrack[];
    artists: SpotifyArtist[];
    setTracks: React.Dispatch<React.SetStateAction<SpotifyTrack[]>>;
    setArtists: React.Dispatch<React.SetStateAction<SpotifyArtist[]>>;
}) {
    return(
        <div 
            className="my-8 gradient-border [--border-left:0] [--border-right:0]"
            style={{ '--background': background } as React.CSSProperties}
        >
            <div className="py-8">
                <div className="w-[900px] max-w-main mx-auto">
                    <div className="grid gap-2 md:grid-cols-2">
                        <ExploreInput<SpotifyArtist> 
                            type={'artist'}
                            items={artists}
                            onItemAdd={artist => setArtists(prev => prev.concat(artist))}
                            onItemRemove={artistId => setArtists(prev => prev.filter(artist => artist.id !== artistId))}
                        />
                        <ExploreInput<SpotifyTrack> 
                            type={'track'}
                            items={tracks}
                            onItemAdd={track => setTracks(prev => prev.concat(track))}
                            onItemRemove={trackId => setTracks(prev => prev.filter(track => track.id !== trackId))}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}