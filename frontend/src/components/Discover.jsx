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

    function clearSearch() {
        const inputElement = document.querySelector('input[name="search"]');
        inputElement.value = '';
        const { name } = inputElement;
        setFormData({ ...formData, [name]: '' });
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
        <div>
            <h1 className='dark:text-white mb-3'>search for any album, song, or artist on spotify</h1>
            <div className='flex flex-row justify-start space-x-4'>
                <form className='bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-md border-2 border-backgroundc-200 dark:border-white'>
                    <input className='bg-gray-100 outline-none text-sm flex-1' type="text" name="search" onChange={handleInputChange} required />
                </form>
                <button className='hover:opacity-80 bg-gradient-to-r from-peach-200 to-peach-500 text-white px-4 py-2 rounded-md mb-3' onClick={clearSearch}>clear search</button>           
            </div>
            <div className='flex flew-row justify-start space-x-5'>
                <button className='hover:opacity-80 bg-gradient-to-r from-backgroundc-200 to-green-500 text-white px-4 py-2 rounded-md my-4' onClick={(event) => handleSubmit(event, "album")}> search albums</button>
                <button className='hover:opacity-80 bg-gradient-to-r from-backgroundc-200 to-green-500 text-white px-4 py-2 rounded-md my-4' onClick={(event) => handleSubmit(event, "track")}> search songs</button>
                <button className='hover:opacity-80 bg-gradient-to-r from-backgroundc-200 to-green-500 text-white px-4 py-2 rounded-md my-4' onClick={(event) => handleSubmit(event, "artist")}> search artists</button>
            </div>
            { albums || tracks || artists ? (
            <>
                {albums && (
                    <>
                    {albums.map((album) =>
                        <div key={album.id}>
                            <h1 className='dark:text-white'>You found {album.name} by {album.artists[0].name}.</h1>
                            <h1 className='dark:text-white'>This album was released on {album.release_date}.</h1>
                            <img src={album.images[0].url} className='rounded-md my-4'/>
                        </div>
                    )}
                    </>
                )}
                {tracks && (
                    <>
                    {tracks.map((track) => 
                        <div key={track.id}>
                            <h1 className='dark:text-white'>You found {track.name} by {track.artists[0].name}.</h1>
                            <h1 className='dark:text-white'>This song was released on {track.album.release_date}.</h1>
                            <img src={track.album.images[0].url} className='rounded-md my-4'/>
                        </div>
                    )}
                    </>
                )}
                {artists && (
                    <>
                    {artists.map((artist) =>
                        <div key={artist.id}>
                            <h1 className='dark:text-white'>You found {artist.name}.</h1>
                            <h1 className='dark:text-white'>They have {artist.followers.total} total followers.</h1>
                            <h1 className='dark:text-white'>Their closest genre is {artist.genres[0]}.</h1>
                            <img src={artist.images[0].url} className='rounded-md my-4'/>
                        </div>  
                    )}
                    </>            
                )}
            </>
            ) : (
                <>
                    <h1 className='dark:text-white mb-3'>look at these new hot releases!</h1>
                    <div className="flex flex-wrap justify-around items-start gap-x-8 max-w-screen-lg mx-auto">
                        {releases && releases.map((release) =>
                            <div key={release.id} className="flex flex-col items-center">
                                <p className='font-bold dark:text-white'>{release.artists[0].name}</p>
                                <h1 className='dark:text-white'>{release.name}</h1>
                                <img src={release.images[0].url} className='h-32 m-2 rounded-md'/>
                            </div>
                        )}
                    </div>
                </>
            )}

        </div>
    )
}

export default Discover