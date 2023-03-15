import { BsFillMoonStarsFill } from 'react-icons/bs'
import { AiFillGithub } from 'react-icons/ai'
import { NavLink, Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';

import { useContext, useState } from 'react';
import { AuthContext } from '../context/context';

function Navbar({handleClick}) {

    const { isLoggedIn, logout } = useContext(AuthContext);
    const [ navOpen, setNavOpen ] = useState(false);

    return (
     <nav className='dark:text-white py-10 mb-4 flex justify-between font-dmsans'>
        <ul className='items-center hidden md:flex'>
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
                <NavLink to='/profile/#short-term'
                className={({ isActive }) =>
                    isActive ? 'text-peach-500' : ''}
                >profile</NavLink>
            </li>)}
        </ul>

        <button
            className='md:hidden'
            onClick={() => setNavOpen((prev) => !prev)}
            >
            {navOpen ? (
                <MdClose className='focus:text-peach-500 hover:opacity-80 text-3xl'/>
            ) : (
                <FiMenu className='focus:text-peach-500 hover:opacity-80 text-3xl'/>
            )}
        </button>

        <ul className={`ml-12 ${navOpen ? 'absolute' : 'hidden'}`}>
            <li className='text-sm shadow-black-b hover:opacity-80'>
                <NavLink to='/'
                onClick={() => setNavOpen(false)}
                className={({ isActive }) =>
                    isActive ? 'text-peach-500' : ''}
                >home</NavLink>
            </li>
            <li className='text-sm hover:opacity-80'>
                <NavLink to='/discover'
                onClick={() => setNavOpen(false)}
                className={({ isActive }) =>
                    isActive ? 'text-peach-500' : ''}
                >discover</NavLink>
            </li>
            <li className='text-sm hover:opacity-80'>
                <NavLink to='/about'
                onClick={() => setNavOpen(false)}
                className={({ isActive }) =>
                    isActive ? 'text-peach-500' : ''}
                >about</NavLink>
            </li>
            {!isLoggedIn() ? ( <></>) : (
            <li className='text-sm hover:opacity-80'>
                <NavLink to='/profile/#short-term'
                onClick={() => setNavOpen(false)}
                className={({ isActive }) =>
                    isActive ? 'text-peach-500' : ''}
                >profile</NavLink>
            </li>)}
        </ul>


        <ul className='flex items-center'>
            <li>
                <Link 
                className='hidden sm:flex'
                to='https://github.com/datowq/notepoint'>
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
  