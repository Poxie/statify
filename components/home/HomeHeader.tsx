import HeaderArtists from "./HeaderArtists";
import HeaderOptions from "./HeaderOptions";
import HeaderTranslateContainer from "./HeaderTranslateContainer";

export default function HomeHeader() {
    return(
        <HeaderTranslateContainer className="pb-16 sm:pb-24">
            <HeaderArtists />
            <div className="pt-12 md:pt-32 pb-40">
                <h1 className="text-3xl sm:text-5xl leading-tight font-semibold text-center mx-auto w-[540px] max-w-main">
                    All your music statistics in one place.
                </h1>
                <p className="text-sm sm:text-lg text-secondary text-center mx-auto w-[730px] max-w-main mt-4">
                    A way to explore your favorite songs and artists in real time. Explore your way through our many exploration options, or login to view your own taste.
                </p>
                <HeaderOptions />
            </div>
        </HeaderTranslateContainer>
)
}