
import { Link } from 'react-router-dom';
import SpotifyLogin from './SpotifyLogin';
import { MdOutlineAirlineSeatFlat } from 'react-icons/md';
import mount from './Assets/m.png';
// <div style={{ backgroundImage: `url(${mount})`}}>
// <div class="bg-[url('./Assets/m.png')]">
function Hero() {

    return (
    <div>
     <div className='text-center dark:text-white py-10'>
        <h1 className='select-none shadowstext font-montserrat text-6xl md:text-7xl lg:text-8xl'>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-peach-200 to-peach-500'>note</span>point.
        </h1>
        
        
        <div class="bg-[url('./Assets/m.png')]">
        <h2 className='text-1xl py-4 md:text-2xl lg:text-3xl'>music stats + sharing</h2>
        <p className='text-md py-5 leading-8 text-gray-500 dark:text-gray-300 mx-auto max-w-xs'>
            sign-in at the top right for more features, 
            or just link your spotify for quick stats!
        </p>
        <div className='flex justify-center gap-16 py-3'>
            <SpotifyLogin/>
            <Link to='/register' className='hover:opacity-80 bg-gradient-to-r from-peach-200 to-peach-500 text-white px-4 py-2 rounded-md' href='#'>
                register
            </Link>
        </div>
     </div>
     </div>
     </div>
    )
  }
  
  export default Hero
  