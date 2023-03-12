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
            ? <p className='text-gray-400 dark:text-gray-100'>Waiting for confirmation...</p> 
            : <>
                <p className='text-gray-400 dark:text-gray-100 mb-5'>You're confirmed!</p>
                <Link to='/' className='border-2 border-peach-400 text-peach-400 rounded-md px-12 py-2 inline-block font-semibold dark:text-peach-400 hover:bg-peach-400 hover:text-white dark:hover:text-white'>Back to Home</Link>
            </>
        }
        </div>
    )
}

export default Verify