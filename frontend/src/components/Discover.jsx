import axios from 'axios';
import { useEffect, useState } from 'react';

const URL = import.meta.env.VITE_URL;

const Discover = () => {

    const [albums, setAlbums] = useState(null);
    const [tracks, setTracks] = useState(null);
    const [artists, setArtists] = useState(null);

    const [releases, setReleases] = useState(null);
    const [formData, setFormData] = useState(null);

    const [token, setToken] = useState(null);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(event, type) {
        event.preventDefault();
        if (formData && formData.search !== "") {
            getSearch(formData, type);
        }
    }

    function getSearch(searched, type) {
        axios.get(`https://api.spotify.com/v1/search?type=${type}&q=${searched.search}&limit=3`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (type === "album") {
                setAlbums(response.data.albums.items.slice(0, 3));
                setTracks(null);
                setArtists(null);
            } else if (type === "track") {
                setTracks(response.data.tracks.items.slice(0, 3));
                setAlbums(null);
                setArtists(null);
            } else {
                setArtists(response.data.artists.items.slice(0, 3));
                setAlbums(null);
                setTracks(null);
            }
        })
        .catch(error => {
            console.log(error);
        });
    };

    function getNewReleases() {
        axios.get(`https://api.spotify.com/v1/browse/new-releases?limit=10`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            setReleases(response.data.albums.items.slice(0, 10));
        })
        .catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        if (token === null) {
            axios.post(URL + '/spotify/gettoken')
            .then(response => {
                setToken(response.data.access_token);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, []);

    useEffect(() => {
        if (token !== null) {
            getNewReleases();
        }
    }, [token]);

    return (
        <>
            <h1>search for any album, song, or artist on spotify</h1>
            <form>
                <input type="text" name="search" onChange={handleInputChange} required />
            </form>
            <div className='flex flew-row justify-start space-x-5'>
                <button className='hover:opacity-80 bg-gradient-to-r from-backgroundc-200 to-green-500 text-white px-4 py-2 rounded-md mt-4' onClick={(event) => handleSubmit(event, "album")}> search albums</button>
                <button className='hover:opacity-80 bg-gradient-to-r from-backgroundc-200 to-green-500 text-white px-4 py-2 rounded-md mt-4' onClick={(event) => handleSubmit(event, "track")}> search songs</button>
                <button className='hover:opacity-80 bg-gradient-to-r from-backgroundc-200 to-green-500 text-white px-4 py-2 rounded-md mt-4' onClick={(event) => handleSubmit(event, "artist")}> search artists</button>
            </div>
            { albums || tracks || artists ? (
            <>
                {albums && (
                    <>
                    {albums.map((album) =>
                        <div key={album.id}>
                            <h1>You found {album.name} by {album.artists[0].name}.</h1>
                            <h1>This album was released on {album.release_date}.</h1>
                            <img src={album.images[0].url} />
                        </div>
                    )}
                    </>
                )}
                {tracks && (
                    <>
                    {tracks.map((track) => 
                        <div key={track.id}>
                            <h1>You found {track.name} by {track.artists[0].name}.</h1>
                            <h1>This song was released on {track.album.release_date}.</h1>
                            <img src={track.album.images[0].url} />
                        </div>
                    )}
                    </>
                )}
                {artists && (
                    <>
                    {artists.map((artist) =>
                        <div key={artist.id}>
                            <h1>You found {artist.name}.</h1>
                            <h1>They have {artist.followers.total} total followers.</h1>
                            <h1>Their closest genre is {artist.genres[0]}.</h1>
                            <img src={artist.images[0].url} />
                        </div>  
                    )}
                    </>            
                )}
            </>
            ) : (
                <>
                    <h1>Browse through new releases</h1>
                    <div className="flex flex-wrap justify-center items-center gap-x-10 max-w-screen-lg mx-auto">
                        {releases && releases.map((release) =>
                            <div key={release.id} className="flex flex-col justify-center items-center">
                                <p className='font-bold'>{release.artists[0].name}</p>
                                <h1>{release.name}</h1>
                                <img src={release.images[0].url} className="h-32"/>
                            </div>
                        )}
                    </div>
                </>
            )}

        </>
    )
}

export default Discover