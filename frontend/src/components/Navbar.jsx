import { BsFillMoonStarsFill } from 'react-icons/bs'
import { AiFillGithub } from 'react-icons/ai'
import { NavLink, Link } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../context/context';

function Navbar({handleClick}) {

    const { isLoggedIn, logout } = useContext(AuthContext);

    return (
     <nav className='dark:text-white py-10 mb-4 flex justify-between font-dmsans'>
        <ul className='flex items-center'>
            <li className='cursor-pointer text-xl shadow-black-b hover:opacity-80'>
                <NavLink to='/'
                className={({ isActive }) =>
                    isActive ? 'text-peach-500' : ''}
                >home</NavLink>
            </li>
            <li className='cursor-pointer text-xl ml-8 hover:opacity-80'>
                <NavLink to='/discover'
                className={({ isActive }) =>
                    isActive ? 'text-peach-500' : ''}
                >discover</NavLink>
            </li>
            <li className='cursor-pointer text-xl ml-8 hover:opacity-80'>
                <NavLink to='/about'
                className={({ isActive }) =>
                    isActive ? 'text-peach-500' : ''}
                >about</NavLink>
            </li>
            {!isLoggedIn() ? ( <></>) : (
            <li className='cursor-pointer text-xl ml-8 hover:opacity-80'>
                <NavLink to='/profile'
                className={({ isActive }) =>
                    isActive ? 'text-peach-500' : ''}
                >profile</NavLink>
            </li>)}
        </ul>
        <ul className='flex items-center'>
            <li>
                <Link to='https://github.com/datowq/notepoint'>
                    <AiFillGithub className='focus:text-peach-500 hover:opacity-80 cursor-pointer text-3xl'/>
                </Link>
            </li>
            <li>
                <BsFillMoonStarsFill onClick={handleClick} className='hover:opacity-80 cursor-pointer text-2xl ml-8'/>
            </li>
            <li>
                {!isLoggedIn() ? (
                    <Link to='/login' className='hover:opacity-80 bg-gradient-to-br from-peach-400 to-peach-500 text-white px-4 py-2 rounded-md ml-8'>
                    login
                    </Link>
                ) : (
                    <Link onClick={logout} className='hover:opacity-80 bg-gradient-to-br from-peach-400 to-peach-500 text-white px-4 py-2 rounded-md ml-8'>
                    logout
                    </Link>
                )}
            </li>
        </ul>
     </nav>
    )
  }
  
  export default Navbar
  