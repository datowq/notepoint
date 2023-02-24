import { Link } from 'react-router-dom';
function Hero() {

    return (
     <div className='text-center dark:text-white py-10'>
        <h1 className='select-none shadowstext font-montserrat text-6xl md:text-7xl lg:text-8xl'>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-peach-200 to-peach-500'>note</span>point.
        </h1>
        <h2 className='text-1xl py-4 md:text-2xl lg:text-3xl'>music stats + sharing</h2>
        <p className='text-md py-5 leading-8 text-gray-500 dark:text-gray-300 mx-auto max-w-xs'>
            sign-in at the top right for more features, 
            or just link your spotify for quick stats!
        </p>
        <div className='flex justify-center gap-16 py-3'>
            <a className='bg-gradient-to-r from-backgroundc-200 to-green-500 text-white px-4 py-2 rounded-md' href='#'>
                Spotify
            </a>
            <Link to='/notepoint/register' className='bg-gradient-to-r from-peach-200 to-peach-500 text-white px-4 py-2 rounded-md' href='#'>
                Register
            </Link>
        </div>
     </div>
    )
  }
  
  export default Hero
  