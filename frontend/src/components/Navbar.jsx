import { BsFillMoonStarsFill } from 'react-icons/bs'
import { AiFillGithub } from 'react-icons/ai'

function NavBar({handleClick}) {
    return (
     <nav className='dark:text-white py-10 mb-12 flex justify-between font-dmsans'>
        <ul className='flex items-center'>
            <li>
                <h1 className='cursor-pointer text-xl hover:opacity-80'>home</h1>
            </li>
            <li>
                <h1 className='cursor-pointer text-xl ml-8 hover:opacity-80'>discover</h1>
            </li>
            <li>
                <h1 className='cursor-pointer text-xl ml-8 hover:opacity-80'>about</h1>
            </li>
        </ul>
        <ul className='flex items-center'>
            <li>
                <AiFillGithub className='hover:opacity-80 cursor-pointer text-3xl'/>
            </li>
            <li>
                <BsFillMoonStarsFill onClick={handleClick} className='hover:opacity-80 cursor-pointer text-2xl ml-8'/>
            </li>
            <li>
                <a className='hover:opacity-80 bg-gradient-to-br from-peach-400 to-peach-500 text-white px-4 py-2 rounded-md ml-8' href='#'>Login</a>
            </li>
        </ul>
     </nav>
    )
  }
  
  export default NavBar
  