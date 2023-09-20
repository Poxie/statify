import { SpotifyTrack, SpotifyTrackWithColor } from "@/types";
import Vibrant from "node-vibrant";

export const getTrackColors = async (tracks: SpotifyTrack[]) => {
    const coloredTracks: SpotifyTrackWithColor[] = [];
    for(const track of tracks) {
        const colors = await new Vibrant(track.album.images.at(-1)?.url || '', { colorCount: 5 }).getPalette();
        const rgb = colors.DarkVibrant?.rgb;
        if(!rgb) {
            tracks.push(track);
            continue;
        }

        coloredTracks.push({
            ...track,
            color: `${rgb[0]} ${rgb[1]} ${rgb[2]}`
        });
    }
    return coloredTracks;
}