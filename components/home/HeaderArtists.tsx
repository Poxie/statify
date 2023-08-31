import Image from "next/image"
import HeaderArtist from "./HeaderArtist"

const ARTISTS = [
    { id: '06HL4z0CvFAxyc27GXpf02', image: 'https://i.scdn.co/image/ab676161000051746a224073987b930f99adc706', top: 125, left: 224 },
    { id: '1Xyo4u8uXC1ZmMpatF05PJ', image: 'https://i.scdn.co/image/ab67616100005174214f3cf1cbe7139c1e26ffbb', top: 260, left: 84 },
    { id: '66CXWjxzNUsdJxJ2JdwvnR', image: 'https://i.scdn.co/image/ab67616100005174cdce7620dc940db079bf4952', top: 395, left: 84 },
    { id: '1URnnhqYAYcrqrcwql10ft', image: 'https://i.scdn.co/image/ab6761610000517435ca7d2181258b51c0f2cf9e', top: 125, right: 224 },
    { id: '4gzpq5DPGxSnKTe4SA8HAU', image: 'https://i.scdn.co/image/ab67616100005174989ed05e1f0570cc4726c2d3', top: 260, right: 84 },
    { id: '69GGBxA162lTqCwzJG5jLp', image: 'https://i.scdn.co/image/ab67616100005174db68d678df6d89bf8a55d052', top: 395, right: 84 },
]

export default function HeaderArtists() {
    return(
        <>
            {ARTISTS.map(artist => (
                <HeaderArtist 
                    {...artist}
                    key={artist.id}
                />
            ))}
        </>
    )
}