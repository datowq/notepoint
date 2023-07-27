import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../context/context';
import Info from '../components/Info';
import Stats from '../components/Stats';
import History from '../components/History';
import SnapshotSelector from '../components/SnapshotSelector';

const URL = import.meta.env.VITE_URL;
const PROFILE_PATH = URL + '/spotify/login/profile';

function ProfilePage({setErrorMessage, setSuccessMessage}) {

    const { isLoggedIn, spotifyIsSynced, setCredentials, hasTokenExpired } = useContext(AuthContext);

    const [profile, setProfile] = useState(null);
    const [songs, setSongs] = useState(null);
    const [artists, setArtists] = useState(null);
    const [recent, setRecent] = useState(null);
    const [success, setSuccess] = useState(false);
    const [history, setHistory] = useState(null);
    const [snapshot, setSnapshot] = useState(null);
    const [date, setDate] = useState(new Date());
    const [timePeriod, setTimePeriod] = useState("short_term");
    const [isActive, setActive] = useState(1);

    const ds = "stats from " + 
    date.getDate() + " " + date.toLocaleString('en-US', { month: 'long' }).toLowerCase() + " " + date.getFullYear()
    + " -" + date.getDate() + " " + date.toLocaleString('en-US', { month: 'long' }).toLowerCase() + " " + date.getFullYear();

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

    }, [success, timePeriod]);

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
        axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=${timePeriod}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        .then(response => {
            setSongs(response.data.items);
        })
        .catch(error => {
            console.log(error);
        });

        axios.get(`https://api.spotify.com/v1/me/top/artists?limit=5&time_range=${timePeriod}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        .then(response => {
            setArtists(response.data.items);
        })
        .catch(error => {
            console.log(error);
        });

        axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=5', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        .then(response => {
            setRecent(response.data.items);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const postSnapshot = () => {
        
        const snapshot = {
            tracks: songs,
            artists: artists, 
            recentlyPlayed: recent,
            timestamp: Date.now(),
        }

        axios.post(URL + '/postsnapshot/' + localStorage.getItem("currentUser"), {
            snapshot: snapshot
        })
            .then(response => {
                if (!response.data.error) {
                    setSuccessMessage(response.data.msg);
                }
                else {
                    setErrorMessage(response.data.error);
                }
            })
            .catch(error => console.log(error))
    }

    const getHistory = () => {

        axios.get(URL + '/gethistory/' + localStorage.getItem("currentUser"))
            .then(response => {
                if (!response.data.error) {
                    setHistory(response.data.snapshots);
                }
                else {
                    setErrorMessage(response.data.error);
                }
            })
            .catch(error => console.log(error))
    }

    const hideHistory = () => {
        setHistory(null);
        setSnapshot(null);
    }

    const displayEntireHistory = () => {
        setSnapshot(null);
    }

    const displayTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toDateString();
    }

    return (
        <>
            {!isLoggedIn() ? (
                <h1 className='font-dmsans dark:text-white text-3xl mb-[75vh]'>heyo! please 
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
                            {history ? (
                                <div>
                                    <div className='flex flex-row'>
                                        <button className='hover:opacity-80 bg-gradient-to-r from-peach-200 to-peach-500 text-white px-4 py-2 rounded-md mb-3 mr-3' onClick={hideHistory}>return to current stats</button>
                                        {snapshot && 
                                        <>
                                            <button className='hover:opacity-80 bg-gradient-to-r from-peach-200 to-peach-500 text-white px-4 py-2 rounded-md mb-3 mr-3' onClick={displayEntireHistory}>display entire history again</button>
                                        </>
                                        }
                                    </div>
                                    <SnapshotSelector snapshots={history} setSnapshot={setSnapshot} />
                                    {!snapshot ? (
                                        <>
                                        <h1 className='font-dmsans dark:text-white text-3xl my-4'>
                                        this is a collection of all your snapshots!</h1>
                                        <History snapshots={history} />
                                        </>
                                    ) : (
                                        <>
                                            <h1 className='font-dmsans dark:text-white text-3xl my-4'>
                                                displaying your snapshot from {displayTime(history[snapshot].timestamp)}!</h1>
                                            <div className='flex flex-row justify-center font-dmsans flex-wrap xl:gap-12 lg:gap-6 gap-2'>
                                                {songs && <Stats list={history[snapshot].tracks} listType="top tracks"/>}
                                                {artists && <Stats list={history[snapshot].artists} listType="top artists"/>}
                                                {recent && <Stats list={history[snapshot].recentlyPlayed} listType="recently played"/>}
                                            </div>
                                        </>
                                        )}
                                </div>
                            ) : (
                                <>
                                    <button className='hover:opacity-80 bg-gradient-to-r from-peach-200 to-peach-500 text-white px-4 py-2 rounded-md mb-3 mr-3' onClick={getHistory}>retrieve history</button>
                                    {timePeriod === 'short_term' && <button className='hover:opacity-80 bg-gradient-to-r from-peach-200 to-peach-500 text-white px-4 py-2 rounded-md mb-3 mr-3' onClick={postSnapshot}>store snapshot</button>}
                                    <h1 className='font-dmsans dark:text-white text-3xl my-4'>
                                        these are your current listening stats!</h1>
                                    <div className='flex justify-center mb-8 font-dmsans'>
                                        <span>{/*date could go here in future*/}</span>
                                        <div className='flex gap-4 text-black dark:text-white'>
                                            <button onClick={() => {setTimePeriod('short_term'); setActive(1);}}
                                            className={(isActive === 1) ? 'text-peach-500 border-b-2 border-black dark:border-white' : ''}
                                            >last month</button>

                                            <button onClick={() => {setTimePeriod('medium_term'); setActive(2);}}
                                            className={(isActive === 2) ? 'text-peach-500 border-b-2 border-black dark:border-white' : ''}
                                            >last 6 months</button>

                                            <button onClick={() => {setTimePeriod('long_term'); setActive(3);}}
                                            className={(isActive === 3) ? 'text-peach-500 border-b-2 border-black dark:border-white' : ''}
                                            >all time</button>
                                        </div>
                                    </div>
                                    {songs && artists && recent && 
                                        <div>
                                            {(songs.length < 3 || artists.length < 3 || recent.length < 3) ? (
                                                <h1 className='font-dmsans dark:text-white text-3xl mb-[75vh]'>we cannot display enough statistics for you yet. please come back when you have listened to more songs!</h1>
                                            ) : (
                                                <div className='flex flex-row justify-center font-dmsans flex-wrap xl:gap-12 lg:gap-6 gap-2'>
                                                    <Stats list={songs} listType="top tracks"/>
                                                    <Stats list={artists} listType="top artists"/>
                                                    <Stats list={recent} listType="recently played"/>
                                                </div>
                                            )}  
                                        </div>
                                    }
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default ProfilePage
