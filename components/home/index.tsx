import ComboProvider from "@/contexts/combo";
import HomeArtistInfo from "./HomeArtistInfo";
import HomeHeader from "./HomeHeader";

export default function Home() {
    return(
        <main className="pb-52">
            <ComboProvider>
                <HomeHeader />
                <HomeArtistInfo />
            </ComboProvider>
        </main>
    )
}