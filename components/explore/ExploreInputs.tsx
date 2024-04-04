import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config';
import ExploreInput from "./ExploreInput";
import { SpotifyArtist, SpotifyTrack } from "@/types";

const background = resolveConfig(tailwindConfig).theme?.backgroundColor?.primary;

export default function ExploreInputs({ genres, setGenres, tracks, setTracks, artists, setArtists }: {
    genres: string[];
    tracks: SpotifyTrack[];
    artists: SpotifyArtist[];
    setGenres: React.Dispatch<React.SetStateAction<string[]>>;
    setTracks: React.Dispatch<React.SetStateAction<SpotifyTrack[]>>;
    setArtists: React.Dispatch<React.SetStateAction<SpotifyArtist[]>>;
}) {
    return(
        <div 
            className="relative z-[2] mt-8 gradient-border [--border-left:0] [--border-right:0]"
            style={{ '--background': background } as React.CSSProperties}
        >
            <div className="py-8">
                <div className="mb-2 w-main max-w-main mx-auto grid gap-2 lg:grid-cols-3">
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
                    <ExploreInput<string> 
                        type={'genre'}
                        items={genres}
                        onItemAdd={genre => setGenres(prev => prev.concat(genre))}
                        onItemRemove={genre => setGenres(prev => prev.filter(g => g !== genre))}
                    />
                </div>
            </div>
        </div>
    )
}