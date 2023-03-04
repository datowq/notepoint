import axios from 'axios';
import { Link } from 'react-router-dom';

const URL = 'http://localhost:5000';

const SpotifyLogin = () => {

    const getToken = () => {
        axios
          .get(URL + '/spotify/login')
          .then(response => {
            console.log(response)
          })
          .catch(console.error);
    };

    return (
        <Link to='http://localhost:5000/spotify/login' className='bg-gradient-to-r from-backgroundc-200 to-green-500 text-white px-4 py-2 rounded-md' 
        >
            spotify
        </Link> 
    )
}

export default SpotifyLogin