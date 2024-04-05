import ProfileArtists from "./ProfileArtists";
import ProfileGenres from "./ProfileGenres";
import ProfileTracks from "./ProfileTracks";

export default function Profile() {
    return(
        <main className="py-10 md:pt-20 mx-auto w-main max-w-main">
            <ProfileArtists />
            <ProfileTracks />
            <ProfileGenres />
        </main>
    )
}