import HeaderArtists from "./HeaderArtists";
import HeaderOptions from "./HeaderOptions";
import HeaderTranslateContainer from "./HeaderTranslateContainer";

export default function HomeHeader() {
    return(
        <HeaderTranslateContainer className="pb-16 sm:pb-24">
            <HeaderArtists />
            <div className="pt-12 pb-40 md:pt-32">
                <h1 className="w-[540px] max-w-main mx-auto text-3xl font-semibold text-center leading-tight sm:text-5xl">
                    All your music statistics in one place.
                </h1>
                <p className="w-[730px] max-w-main mx-auto mt-4 text-sm text-center text-secondary sm:text-lg">
                    A way to explore your favorite songs and artists in real time. Explore your way through our many exploration options, or login to view your own taste.
                </p>
                <HeaderOptions />
            </div>
        </HeaderTranslateContainer>
    )
}