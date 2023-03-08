import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../context/context';
import Info from '../components/Info';
import Stats from '../components/Stats';

const URL = 'http://localhost:3001';

function ProfilePage() {

    const { isLoggedIn, spotifyIsSynced, setCredentials } = useContext(AuthContext);

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

    }, []);

    return (
        <>
            {!isLoggedIn() ? (
                <h1>you need to log in first before accessing your profile page!</h1>
            ) : (
                <>
                    {!spotifyIsSynced() ? (
                        <Link to='http://localhost:3001/spotify/login/home' className='hover:opacity-80 bg-gradient-to-r from-backgroundc-200 to-green-500 text-white px-4 py-2 rounded-md'>
                        link your spotify to save stats!
                        </Link> 
                    ) : (
                        <h1>your spotify is linked!</h1>
                    )}
                </>
            )}
            <Info />
            <Stats />
        </>
    )
}

export default ProfilePage