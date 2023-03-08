import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRegEnvelope } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { MdLockOutline } from 'react-icons/md'

import { AuthContext } from '../context/context';

const URL = import.meta.env.VITE_URL;

const Login = () => {

    const { login, isLoggedIn } = useContext(AuthContext);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

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
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
        setUser('');
        setPwd('');
    }

    return (
        <>
            {isLoggedIn() ? (
                <section>
                    <h1>You are logged in!</h1>
                    <>
                        <Link to='/profile' className='text-xs'>
                            go to your profile page
                        </Link>
                    </>
                </section>
            ) : (
                <div className='flex flex-col items-center justify-center w-full flex-1 text-center font-dmsans'>
                    <div className='bg-white dark:bg-backgroundc-300 rounded-md shadow-2xl flex w-10/12 max-w-4xl'>
                        <div className='w-10/12 p-5'>
                            <div className='text-left dark:text-white font-bold'>
                                <span className='bg-clip-text text-transparent bg-gradient-to-r from-peach-200 to-peach-500'>note</span>point.
                            </div>
                            <div className='py-10'>
                                <h2 className='text-3xl font-bold text-peach-400 mb-2'>sign in</h2>
                                <div className='border-2 w-10 border-peach-400 inline-block mb-2'/>
                                <p className='text-gray-400 dark:text-gray-100 mb-3'>username + email + password</p>

                                <p className={errMsg ? 'font-semibold p-1 mb-1 text-red-600 bg-peach-100' : 'opacity-0'}>{errMsg}</p>
                                <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                                    <div className='bg-gray-100 w-64 p-2 flex items-cente mb-3 rounded-md'>
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

                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-2 rounded-md'>
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

                                    <div className='flex dark:text-white w-64 mb-5 justify-between'>
                                        <label className='flex items-center text-xs'>
                                            <input className='mr-1'
                                                type="checkbox" 
                                                name="remember"

                                            />
                                            remember me
                                        </label>
                                        <Link to='/forgot' className='text-xs'>
                                            forgot password?
                                        </Link>
                                    </div>
                                    <button className='border-2 border-peach-400 text-peach-400 rounded-md px-12 py-2 inline-block font-semibold dark:text-peach-400 hover:bg-peach-400 hover:text-white dark:hover:text-white'>sign in</button>
                                </form>
                            </div>
                        </div>
                        <div className='w-6/12 bg-peach-400 text-white rounded-r-md py-36 px-12'>
                            <h2 className='text-3xl font-bold'>join us!</h2>
                            <div className='border-2 w-10 border-white inline-block mb-2'/>
                            <p className='mb-10'>save your stats + extra features</p>
                            <Link to='/register' className='border-2 border-white rounded-md px-12 py-2 inline-block font-semibold hover:bg-white hover:text-peach-400'>sign up</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Login