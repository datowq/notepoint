import "./stats.css"

export default function Stats({songs}) {
    return (
        <div className='dark:text-white'>
            <div className="stats">
                See what you've been listening to on repeat!
                <div className="statsSection">
                    Top Songs:
                    <div className="bubbles">
                    {songs.map((song) => (
                        <img key={song.id} className="picture" src={song.album.images[0].url} alt={song.name}/>
                    ))}
                    </div>
                    <div className="bubbles">
                        {songs.map((song) => (
                            <div key={song.id} className="description">
                                {song.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
