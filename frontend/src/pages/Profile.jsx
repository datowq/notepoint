import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../context/context';
import Info from '../components/Info';
import Stats from '../components/Stats';

const URL = import.meta.env.VITE_URL;
const PROFILE_PATH = URL + '/spotify/login/profile';

function ProfilePage() {

    const { isLoggedIn, spotifyIsSynced, setCredentials, hasTokenExpired } = useContext(AuthContext);

    const [profile, setProfile] = useState(null);
    const [songs, setSongs] = useState(null);
    const [artists, setArtists] = useState(null);
    const [recent, setRecent] = useState(null);
    const [success, setSuccess] = useState(false);
    const [timePeriod, setTimePeriod] = useState("short_term");

    const getCredentials = () => {

        axios.get(URL + '/retrievetoken/' + localStorage.getItem("currentUser"))
            .then(response => {
                if (response.data.accessToken && response.data.accessToken !== null) {
                    setCredentials(response.data.accessToken, response.data.refreshToken, response.data.timestamp);
                }
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
                setSuccess(true);
            }
            else {
                storeCredentials(accessToken, refreshToken, timestamp);
                setCredentials(accessToken, refreshToken, timestamp);
                setSuccess(true);
            }
        }

    }, []);

    useEffect(() => {

        if (isLoggedIn() && spotifyIsSynced() && !hasTokenExpired()) {
            getProfile();
            getStats();
        }

    }, [success]);

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
        axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=long_term', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        .then(response => {
            setSongs(response.data.items.slice(0, 10));
        })
        .catch(error => {
            console.log(error);
        });

        axios.get('https://api.spotify.com/v1/me/top/artists?limit=10&time_range=long_term', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        .then(response => {
            setArtists(response.data.items.slice(0, 10));
        })
        .catch(error => {
            console.log(error);
        });

        axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        .then(response => {
            setRecent(response.data.items.slice(0, 10));
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <>
            {!isLoggedIn() ? (
                <h1 className='font-dmsans dark:text-white text-3xl'>heyo! please 
                <Link to='/login' className='text-peach-400'> log in </Link> 
                before accessing your profile page!</h1>
            ) : (
                <>
                    {!spotifyIsSynced() ? (
                        <Link to={PROFILE_PATH} className='hover:opacity-80 bg-gradient-to-r from-backgroundc-200 to-green-500 text-white px-4 py-2 rounded-md'>
                        link spotify
                        </Link> 
                    ) : (
                        <>
                            {profile && <Info profile={profile} />}
                            <div className='min-w-full flex xs:flex-wrap space-x-4'>
                                {songs && <Stats list={songs} listType="top tracks"/>}
                                {artists && <Stats list={artists} listType="top artists"/>}
                                {recent && <Stats list={recent} listType="recently played"/>}
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default ProfilePage