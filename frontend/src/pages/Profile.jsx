import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../context/context';
import Info from '../components/Info';
import Stats from '../components/Stats';

const URL = import.meta.env.VITE_URL;
const PROFILE_PATH = URL + '/spotify/login/profile';
console.log(PROFILE_PATH)

function ProfilePage() {

    const { isLoggedIn, spotifyIsSynced, setCredentials } = useContext(AuthContext);

    const [profile, setProfile] = useState(null);
    const [songs, setSongs] = useState(null);

    const getCredentials = () => {

        axios.get(URL + '/retrievetoken/' + localStorage.getItem("currentUser"))
            .then(response => {
                if (response.data.accessToken && response.data.accessToken !== null) {
                    setCredentials(response.data.accessToken, response.data.refreshToken, response.data.timestamp);
                }
                console.log(response.data.accessToken)
                console.log(localStorage.getItem("currentUser"))
            })
            .catch(error => console.log(error))
    }

    const storeCredentials = (accessToken, refreshToken, timestamp) => {

        axios.post(URL + '/storetoken/' + localStorage.getItem("currentUser"), {
            accessToken: accessToken,
            refreshToken: refreshToken,
            timestamp: timestamp,
        })
            .then(response => {
                const data = response.data;
                console.log(data);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {

        if (isLoggedIn() && !spotifyIsSynced()) {

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const accessToken = urlParams.get('access_token');
            const refreshToken = urlParams.get('refresh_token');
            const timestamp = Date.now();

            if (accessToken === null) {
                getCredentials();
            }
            else {
                storeCredentials(accessToken, refreshToken, timestamp);
                setCredentials(accessToken, refreshToken, timestamp);
            }
        }
        
        if (isLoggedIn() && spotifyIsSynced()) {
            getProfile();
            getStats();
        }

    }, []);

    const getProfile = () => {
        axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
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
        axios.get('https://api.spotify.com/v1/me/top/tracks?limit=5', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        .then(response => {
            setSongs(response.data.items.slice(0, 5));
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <>
            {!isLoggedIn() ? (
                <h1>you need to log in first before accessing your profile page!</h1>
            ) : (
                <>
                    {!spotifyIsSynced() ? (
                        <Link to={PROFILE_PATH} className='hover:opacity-80 bg-gradient-to-r from-backgroundc-200 to-green-500 text-white px-4 py-2 rounded-md'>
                        link your spotify to save stats!
                        </Link> 
                    ) : (
                        <>
                            <h1>your spotify is linked!</h1>
                            {profile && <Info profile={profile} />}
                            {songs && <Stats songs={songs} />}
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default ProfilePage