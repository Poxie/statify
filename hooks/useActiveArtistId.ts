import { useEffect, useState } from "react"

const ARTIST_ATTRIBUTE = 'data-artist-id'
export const useActiveArtistId = () => {
    const [activeArtistId, setActiveArtistId] = useState<string | null>(null);

    useEffect(() => {
        const element = document.querySelector(`[${ARTIST_ATTRIBUTE}`);
        if(!element) throw new Error('Element does not exist.');
        setActiveArtistId(element.getAttribute(ARTIST_ATTRIBUTE));

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if(mutation.type === 'attributes') {
                    setActiveArtistId(element.getAttribute(ARTIST_ATTRIBUTE));
                }
            })
        });
        observer.observe(element, { attributes: true });

        return () => observer.disconnect();
    }, []);

    return activeArtistId;
}