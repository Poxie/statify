import HeaderArtists from "./HeaderArtists";
import HeaderOptions from "./HeaderOptions";
import HomeArtistInfo from "./HomeArtistInfo";

export default function Home({
    searchParams: { a: artistId }
}: {
    searchParams: { a?: string };
}) {
    return(
        <main>
            <HeaderArtists />
            <div className="py-32">
                <h1 className="text-5xl leading-tight font-semibold text-center mx-auto w-[540px] max-w-main">
                    All your music statistics in one place.
                </h1>
                <p className="text-lg text-secondary text-center mx-auto w-[730px] max-w-main mt-4">
                    A way to explore your favorite songs and artists in real time. Explore your way through our many exploration options, or login to view your own taste.
                </p>
                <HeaderOptions />
                <HomeArtistInfo artistId={artistId} />
            </div>
        </main>
    )
}