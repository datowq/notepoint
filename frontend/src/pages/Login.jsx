import { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg'
import { MdLockOutline } from 'react-icons/md'

import { AuthContext } from '../context/context';

const URL = import.meta.env.VITE_URL;

const Login = ({setErrorMessage}) => {

    const navigate = useNavigate();

    const { login, isLoggedIn } = useContext(AuthContext);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(URL + '/login',
            {
                username: user,
                password: pwd,
            }
            );
            const data = response.data;
            console.log(data);
            if (!data.error) {
                login(data.username);
                navigate('/profile');
            }
            else {
                setErrorMessage(data.error);
            }
        } catch (err) {
            console.log(err);
        }
        setUser('');
        setPwd('');
    }

    return (
        <>
            {isLoggedIn() ? (
                <h1 className='font-dmsans dark:text-white text-3xl'>
                    you are currently logged in. go back to your
                    <Link to='/profile' className='text-peach-400'> profile page! </Link>
                </h1>
            ) : (
                <div className='flex flex-col items-center justify-center w-full flex-1 text-center font-dmsans mb-12'>
                    <div className='bg-white dark:bg-backgroundc-300 rounded-md shadow-2xl flex flex-col lg:flex-row w-full max-w-3xl'>
                        <div className='w-full p-5'>
                        <div className='text-left dark:text-white font-bold'>
                            <span className='bg-clip-text text-transparent bg-gradient-to-r from-peach-200 to-peach-500'>note</span>point.
                        </div>
                        <div className='py-10'>
                            <h2 className='text-3xl font-bold text-peach-400 mb-2'>sign in</h2>
                            <div className='border-2 w-10 border-peach-400 inline-block mb-2'/>
                            <p className='text-gray-400 dark:text-gray-100 mb-3'>username + password</p>

                            <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                            <div className='bg-gray-100 w-full lg:w-64 p-2 flex items-center mb-3 rounded-md'>
                                <CgProfile className='text-gray-400 m-2'/>
                                <input className='bg-gray-100 outline-none text-sm flex-1'
                                type="text"
                                id="username"
                                placeholder='username'
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                />
                            </div>

                            <div className='bg-gray-100 w-full lg:w-64 p-2 flex items-center mb-2 rounded-md'>
                                <MdLockOutline className='text-gray-400 m-2'/>
                                <input className='bg-gray-100 outline-none text-sm flex-1'
                                type="password"
                                id="password"
                                placeholder="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                />
                            </div>

                            <div className='flex dark:text-white w-full md:w-64 mb-5 justify-center'>
                                <Link to='/forgot' className='text-xs'>
                                forgot password?
                                </Link>
                            </div>

                            <button className='border-2 border-peach-400 text-peach-400 rounded-md px-6 py-2 inline-block font-semibold dark:text-peach-400 hover:bg-peach-400 hover:text-white dark:hover:text-white'>sign in</button>
                            </form>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 bg-peach-400 text-white rounded-b-md lg:rounded-r-md lg:rounded-bl-none py-10 md:py-36 px-6 md:px-12">
                        <h2 className="text-3xl font-bold">join us!</h2>
                        <div className="border-2 w-6 h-px bg-white inline-block my-2 md:m-4"></div>
                        <p className="mb-4">save your stats + extra features</p>
                        <a href="/register" className="border-2 border-white rounded-md px-4 py-2 inline-block font-semibold hover:bg-white hover:text-peach-400">sign up</a>
                    </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Login