import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const URL = import.meta.env.VITE_URL;

function Verify(props) {
    
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
            ? <p>Waiting for confirmation...</p> 
            : <Link to='/'>
                You're confirmed! Go back to home.
            </Link>
        }
        </div>
    )
}

export default Verify