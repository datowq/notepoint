import { Link } from 'react-router-dom';

const URL = import.meta.env.VITE_URL;
const STATS_PATH = URL + '/spotify/login/stats';

const SpotifyLogin = () => {
    return (
        <Link to={STATS_PATH} className='hover:opacity-80 bg-gradient-to-r from-backgroundc-200 to-green-500 text-white px-4 py-2 rounded-md'>
            spotify
        </Link> 
    )
}

export default SpotifyLogin