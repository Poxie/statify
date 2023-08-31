import HeaderOptions from "./HeaderOptions";

export default function Home() {
    return(
        <main>
            <div className="py-32">
                <h1 className="text-5xl leading-tight font-semibold text-center mx-auto w-[540px] max-w-main">
                    All your music statistics in one place.
                </h1>
                <p className="text-lg text-secondary text-center mx-auto w-[730px] max-w-main mt-4">
                    A way to explore your favorite songs and artists in real time. Explore your way through our many exploration options, or login to view your own taste.
                </p>
                <HeaderOptions />
            </div>
        </main>
    )
}