export default function TopListExplanation() {
    return(
        <div className="border-t-[1px] border-t-tertiary py-16">
            <div className="w-main max-w-main mx-auto">
                <h2 className="text-3xl font-semibold">
                    How top tracks are determined
                </h2>
                <p className="text-lg text-secondary mt-2 mb-8">
                    It is currently not possible to get top tracks by country, or globally for that matter. Therefore, we have to be a little sneaky to achieve this, which comes with its pros and cons. We simple search for playlists with the query
                    {' '}
                    <code className="p-1.5 bg-tertiary text-sm font-bold text-secondary rounded-md">
                        spotify top 50 - {'{country}'}
                    </code>
                    . The songs displayed are retrieved from the best match of this query, which is far from accurate.
                </p>
                <h2 className="text-3xl font-semibold">
                    Top tracks’ accuracy
                </h2>
                <p className="text-lg text-secondary mt-2">
                    The accuracy for top tracks varies based on what country you aim to view. For instance, most European countries have official, or unofficial, playlists with their countries’ top songs. If you are unsure of the authenticity of the top songs, just check the ‘based on’ text underneath the last track. Tracks with the highest authenticity has 
                    {' '}
                    <code className="p-1.5 bg-tertiary text-sm font-bold text-secondary rounded-md">
                        Top 50 - {'{country}'}
                    </code>
                    {' '} 
                    in the playlist name and are created by Spotify themselves.
                </p>
            </div>
        </div>
    )
}