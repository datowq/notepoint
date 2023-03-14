import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const URL = import.meta.env.VITE_URL;

function Verify() {
    
    const { id } = useParams();
  
    const [confirming, setConfirming] = useState(true);

    useEffect(() => {

        axios.get(URL + '/email/confirm/' + id)
        .then(response => {
            setConfirming(false);
            console.log(response.data.msg)
        })
        .catch(error => console.log(error))
        
    }, []);

    return(
        <div>
        {confirming
            ? <p className='text-4xl font-dmsans dark:text-white'>Waiting for confirmation...</p> 
            : <>
                <p className='text-4xl font-dmsans dark:text-white mb-5'>verification confirmed!</p>
                <Link to='/login' className='hover:opacity-80 bg-gradient-to-br from-peach-400 to-peach-500 text-white px-4 py-2 rounded-md'>
                    login
                </Link>
            </>
        }
        </div>
    )
}

export default Verify