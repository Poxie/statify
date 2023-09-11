import TopListHeader from "./TopListHeader";
import TopListContainer from "./TopListContainer";

export default function TopLists() {
    return(
        <main className="pt-10 sm:pt-20 pb-8 flex flex-col gap-8">
            <TopListHeader />
            <TopListContainer />
        </main>
    )
}