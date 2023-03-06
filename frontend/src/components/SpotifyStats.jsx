import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SpotifyStats = () => {

    const [token, setToken] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const accessToken = urlParams.get('access_token');

        setToken(accessToken);

      }, []);

    useEffect(() => {
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
    }, [token]);

    return (
        <>
            {!token ? (
                <Link to='http://localhost:3001/spotify/login' className='hover:opacity-80 bg-gradient-to-r from-backgroundc-200 to-green-500 text-white px-4 py-2 rounded-md'>
                something went wrong. login again
                </Link> 
            ) : (
                <>
                    <h1>logged in!</h1>
                    {profile && (
                        <div>
                            <h1>{profile.display_name}</h1>
                            <p>{profile.followers.total} Followers</p>
                            {profile.images.length && profile.images[0].url && (
                            <img src={profile.images[0].url} />
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default SpotifyStats