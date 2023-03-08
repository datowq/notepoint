import "./stats.css"

export default function Stats() {
    return (
        <div className='dark:text-white'>
            <div className="stats">
                See what you've been listening to on repeat!
                <div className="statsSection">
                    Top Songs:
                    <div className="bubbles">
                        <img className="picture" src="/bird.jpg" alt="song pic 1"/>
                        <img className="picture" src="/bird.jpg" alt="song pic 2"/>
                        <img className="picture" src="/bird.jpg" alt="song pic 3"/>
                        <img className="picture" src="/bird.jpg" alt="song pic 4"/>
                        <img className="picture" src="/bird.jpg" alt="song pic 5"/>
                    </div>
                    <div className="bubbles">
                        <div className="description">
                            song1
                        </div>
                        <div className="description">
                            song2
                        </div>
                        <div className="description">
                            song3
                        </div>
                        <div className="description">
                            song4
                        </div>
                        <div className="description">
                            song5
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
