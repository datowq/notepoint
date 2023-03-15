import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


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
        axios.get(`https://api.spotify.com/v1/search?type=${type}&q=${searched.search}&limit=10`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (type === "album") {
                setAlbums(response.data.albums.items.slice(0, 10));
                setTracks(null);
                setArtists(null);
            } else if (type === "track") {
                setTracks(response.data.tracks.items.slice(0, 10));
                setAlbums(null);
                setArtists(null);
            } else {
                setArtists(response.data.artists.items.slice(0, 10));
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
                <h1 className='dark:text-white mb-3'>these are your results!</h1>
                {albums && (
                <div className="flex flex-wrap justify-between items-start gap-x-8 max-w-screen-lg mx-auto">
                    {albums.map((album) => (
                    <div key={album.id} className="w-full md:w-1/3 lg:w-1/4 p-4">
                        {album.images.length > 0 && (
                        <Link to={album.external_urls.spotify}>
                            <img
                                src={album.images[0].url}
                                alt={album.name}
                                className="rounded-md mb-4 w-full h-auto max-h-[14rem] object-cover"
                            />
                        </Link>
                        )}
                        <h1 className="dark:text-white font-bold text-lg mb-2 text-center">
                        {album.name.toLowerCase()}
                        </h1>
                        <h2 className="dark:text-white text-base font-medium mb-1 text-center">
                        {album.artists[0].name.toLowerCase()}
                        </h2>
                        <p className="dark:text-white text-sm mb-2 text-center">
                        released on {album.release_date}
                        </p>
                    </div>
                    ))}
                </div>
                )}
                {tracks && (
                <div className="flex flex-wrap justify-between items-start gap-x-8 max-w-screen-lg mx-auto">
                    {tracks.map((track) => (
                    <div key={track.id} className="w-full md:w-1/3 lg:w-1/4 p-4">
                        {track.album.images.length > 0 ? (
                        <Link to={track.external_urls.spotify}>
                            <img
                                src={track.album.images[0].url}
                                alt={track.name}
                                className="rounded-md mb-4 w-full h-auto max-h-[14rem] object-cover"
                            />
                        </Link>
                        ) : 
                        (<div className="h-40 w-auto object-contain rounded-md mb-4 bg-gray-300"></div>)}
                        <h1 className="dark:text-white font-bold text-lg mb-2 text-center">
                        {track.name.toLowerCase()}
                        </h1>
                        <h2 className="dark:text-white text-base font-medium mb-1 text-center">
                        {track.artists[0].name.toLowerCase()}
                        </h2>
                        <p className="dark:text-white text-sm mb-2 text-center">
                        released on {track.album.release_date}
                        </p>
                    </div>
                    ))}
                </div>
                )}
                {artists && (
                <div className="flex flex-wrap justify-between items-start gap-x-8 max-w-screen-lg mx-auto">
                    {artists.map((artist) => (
                    <div key={artist.id} className="w-full md:w-1/3 lg:w-1/4 p-4">
                        {artist.images.length > 0 ? (
                        <Link to={artist.external_urls.spotify}>
                            <img
                                src={artist.images[0].url}
                                alt={artist.name}
                                className="rounded-md mb-4 w-full h-auto max-h-[14rem] object-cover"
                            />
                        </Link>)
                        : 
                        (<Link to={artist.external_urls.spotify}>
                            <div className="flex justify-center text-[5rem] items-center h-[14rem] max-h-[14rem] w-auto object-contain rounded-md mb-4 bg-gray-300">?</div>
                        </Link>)}
                        <h1 className="dark:text-white font-bold text-lg mb-2 text-center">
                        {artist.name.toLowerCase()}
                        </h1>
                        <h2 className="dark:text-white text-base font-medium mb-1 text-center">
                        {artist.followers.total} total followers
                        </h2>
                        {artist.genres.length > 0 && (
                        <p className="dark:text-white text-sm mb-2 text-center">
                            genre: {artist.genres[0].toLowerCase()}
                        </p>
                        )}
                    </div>
                    ))}
                </div>
            )}
            </>
            ) : (
                <>
                    <h1 className='dark:text-white mb-3'>look at these new hot releases!</h1>
                    <div className="flex flex-wrap justify-between items-start gap-x-8 max-w-screen-lg mx-auto">
                    {releases && releases.map((release) => (
                        <div key={release.id} className="w-full md:w-1/3 lg:w-1/4 p-4">
                        {release.images.length > 0 && (
                            <Link to={release.external_urls.spotify}>
                                <img
                                src={release.images[0].url}
                                alt={release.name}
                                className="rounded-md mb-4 w-full h-auto max-h-[14rem] object-cover"
                                />
                            </Link>
                        )}
                        <p className="font-bold dark:text-white text-center mb-1">
                            {release.name}
                        </p>
                        <h1 className="dark:text-white text-center mb-2">
                            {release.artists[0].name}
                        </h1>
                        </div>
                    ))}
                    </div>
                </>
            )}

        </div>
    )
}

export default Discover