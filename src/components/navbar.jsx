import { BsFillMoonStarsFill } from 'react-icons/bs'
import { AiFillGithub } from 'react-icons/ai'

function NavBar({handleClick}) {
    return (
     <nav className='dark:text-white py-10 mb-12 flex justify-between font-dmsans'>
        <ul className='flex items-center'>
            <li>
                <h1 className='cursor-pointer text-xl'>home</h1>
            </li>
            <li>
                <h1 className='cursor-pointer text-xl ml-8'>discover</h1>
            </li>
            <li>
                <h1 className='cursor-pointer text-xl ml-8'>about</h1>
            </li>
        </ul>
        <ul className='flex items-center'>
            <li>
                <AiFillGithub className='cursor-pointer text-3xl' href='https://github.com/datowq/notepoint'/>
            </li>
            <li>
                <BsFillMoonStarsFill onClick={handleClick} className='cursor-pointer text-2xl ml-8'/>
            </li>
            <li>
                <a className='bg-gradient-to-br from-peach-400 to-peach-500 text-white px-4 py-2 rounded-md ml-8' href='#'>Login</a>
            </li>
        </ul>
     </nav>
    )
  }
  
  export default NavBar
  