import Artists from '@/assets/json/defaultArtists.json';

const getRandomArtist = () => {
    return Artists[Math.floor(Math.random() * Artists.length)].id;
}

export default async function HomeArtistInfo({
    artistId
}: {
    artistId?: string;
}) {
    const artistInfo = await fetch(`http://localhost:3000/artist/${artistId || getRandomArtist()}`).then(res => res.json());
    console.log(artistInfo);
    return(
        <div>
            artist
        </div>
    )
}
