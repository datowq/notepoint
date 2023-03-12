import axios from 'axios';
import { useEffect, useState } from 'react';

const URL = import.meta.env.VITE_URL;

const Discover = () => {

    const [album, setAlbum] = useState(null);
    const [releases, setReleases] = useState(null);
    const [formData, setFormData] = useState(null);

    const [token, setToken] = useState(null);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        getSearch(formData);
    }

    function getSearch(searched) {
        axios.get(`https://api.spotify.com/v1/search?type=album&q=${searched.album}&limit=1`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            setAlbum(response.data);
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
        getNewReleases();
    }, [token]);

    function makeNewSearch() {
        setAlbum(null);
    }

    return (
        <>
            {album ? (
                <>
                    <h1>You found {album.albums.items[0].name} by {album.albums.items[0].artists[0].name}.</h1>
                    <h1>This album was released on {album.albums.items[0].release_date}.</h1>
                    <img src={album.albums.items[0].images[0].url} />
                    <button onClick={makeNewSearch}>make a new search</button>
                </>
            ) : (
                <>
                    <h1>Search for an album</h1>
                    <form method="post" className="filters" onSubmit={handleSubmit}>
                        <div className="Album">
                            <label htmlFor="Album">Album: </label>
                            <input type="text" name="album" onChange={handleInputChange} required />
                        </div>
                        <div className="Artist">
                            <label htmlFor="Artist">Artist: </label>
                            <input type="text" name="artist" onChange={handleInputChange} required />
                        </div>
                        <div className="submit">
                            <input type="submit" value="Enter!" />
                        </div>
                    </form>
                    <h1>Browse through new releases</h1>
                    {releases && releases.map((release) =>
                        <div key={release.id}>
                            <h1>{release.artists[0].name}</h1>
                            <h1>{release.name}</h1>
                            <h1>Release date: {release.release_date}</h1>
                            <h1>Total tracks: {release.total_tracks}</h1>
                            <img src={release.images[0].url} />
                        </div>
                    )}
                </>
            )}

        </>
    )
}

export default Discover