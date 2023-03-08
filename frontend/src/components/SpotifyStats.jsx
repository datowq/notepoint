import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SpotifyStats = () => {

    const [token, setToken] = useState(null);
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const accessToken = urlParams.get('access_token');

        setToken(accessToken);

      }, []);

    const getProfile = () => {
        axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            setProfile(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const getStats = () => {
        axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            setStats(response.data.items.slice(0, 10));
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getData = () => {
        getProfile();
        getStats();
    }

    return (
        <>
            <>
                {!token ? (
                    <Link to='http://localhost:3001/spotify/login' className='hover:opacity-80 bg-gradient-to-r from-backgroundc-200 to-green-500 text-white px-4 py-2 rounded-md'>
                    something went wrong. login again
                    </Link> 
                ) : (
                    <>
                        <h1>your spotify account was retrieved!</h1>
                        {profile ? (
                            <div>
                            <h1>{profile.display_name}</h1>
                            <p>{profile.followers.total} Followers</p>
                            {profile.images.length && profile.images[0].url && (
                                <img src={profile.images[0].url} />
                            )}
                            </div>
                        ) : (
                            <button onClick={getData}>show quick stats!</button>
                        )}
                        {stats && (stats.map((song) => (
                            <div key={song.id}>
                                <h1>{song.artists[0].name}</h1>
                                <h1>{song.name}</h1>
                                <h1>{song.album.release_date}</h1>
                                <img src={song.album.images[0].url} />
                            </div>
                        )))}
                    </>
                )}
            </>
            <p>
                <Link to='/' >
                    return home
                </Link>
            </p>
        </>
    )
}

export default SpotifyStats