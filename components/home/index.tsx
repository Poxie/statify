import ComboProvider from "@/contexts/combo";
import HomeArtist from "./HomeArtist";
import HomeHeader from "./HomeHeader";

export default function Home() {
    return(
        <main className="pb-52">
            <ComboProvider>
                <HomeHeader />
                <HomeArtist />
            </ComboProvider>
        </main>
    )
}