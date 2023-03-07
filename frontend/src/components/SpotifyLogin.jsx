import axios from 'axios';
import { Link } from 'react-router-dom';

const SpotifyLogin = () => {
    return (
        <Link to='http://localhost:3001/spotify/login/stats' className='hover:opacity-80 bg-gradient-to-r from-backgroundc-200 to-green-500 text-white px-4 py-2 rounded-md'>
            spotify
        </Link> 
    )
}

export default SpotifyLogin