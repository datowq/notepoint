import { BsFillMoonStarsFill } from 'react-icons/bs'
import { AiFillGithub } from 'react-icons/ai'
import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../context/context';

function Navbar({handleClick}) {

    const { isLoggedIn, logout } = useContext(AuthContext);

    return (
     <nav className='dark:text-white py-10 mb-12 flex justify-between font-dmsans'>
        <ul className='flex items-center'>
            <li>
                <Link to='/' className='cursor-pointer text-xl hover:opacity-80'>home</Link>
            </li>
            <li>
                <Link to='/discover' className='cursor-pointer text-xl ml-8 hover:opacity-80'>discover</Link>
            </li>
            <li>
                <Link to='/about' className='cursor-pointer text-xl ml-8 hover:opacity-80'>about</Link>
            </li>
        </ul>
        <ul className='flex items-center'>
            <li>
                <Link to='https://github.com/datowq/notepoint'>
                    <AiFillGithub className='hover:opacity-80 cursor-pointer text-3xl'/>
                </Link>
            </li>
            <li>
                <BsFillMoonStarsFill onClick={handleClick} className='hover:opacity-80 cursor-pointer text-2xl ml-8'/>
            </li>
            <li>
                {!isLoggedIn() ? (
                    <Link to='/login' className='hover:opacity-80 bg-gradient-to-br from-peach-400 to-peach-500 text-white px-4 py-2 rounded-md ml-8' href='#'>
                    login
                    </Link>
                ) : (
                    <button onClick={logout} className='hover:opacity-80 bg-gradient-to-br from-peach-400 to-peach-500 text-white px-4 py-2 rounded-md ml-8' href='#'>
                    logout
                    </button>
                )}
            </li>
        </ul>
     </nav>
    )
  }
  
  export default Navbar
  