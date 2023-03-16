import { Link } from 'react-router-dom';
import SpotifyLogin from './SpotifyLogin';
import { MdOutlineAirlineSeatFlat } from 'react-icons/md';
import { useContext } from 'react';
import { AuthContext } from '../context/context';

function Hero() {

    const { isLoggedIn } = useContext(AuthContext);

    return (
     <div className='text-center dark:text-white py-10'>
        <h1 className='select-none shadowstext font-montserrat text-5xl md:text-8xl lg:text-9xl'>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-peach-200 to-peach-500'>
                note</span>point.
        </h1>
        <h2 className='font-montserrat text-1xl py-4 md:text-2xl lg:text-3xl'>music + stats</h2>
        <p className='font-dmsans text-sm md:text-md pb-5 leading-8 text-gray-500 dark:text-gray-300 mx-auto max-w-xs'>
            create an account with us for more holistic stats, 
            or just link your spotify for quick stats!
        </p>
        <div className='font-dmsans flex justify-center gap-16 py-3'>
            {/* <SpotifyLogin/> */}
            {!isLoggedIn() && 
                <Link to='/register' className='hover:opacity-80 bg-gradient-to-r from-peach-200 to-peach-500 text-white px-4 py-2 rounded-md' href='#'>
                register
                </Link>
            }
        </div>
     </div>
 
    )
  }
  
  export default Hero
  