import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg'
import { FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'

// https://github.com/gitdagray/react_register_form

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const URL = import.meta.env.VITE_URL;

const Register = ({setErrorMessage}) => {

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [mail, setMail] = useState('');
    const [validMail, setValidMail] = useState(false);
    const [mailFocus, setMailFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidMail(EMAIL_REGEX.test(mail));
    }, [mail])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(URL + '/register',
            {
                username: user,
                email: mail,
                password: pwd,
            }
            );
            const data = response.data;
            console.log(data);
            if (!data.error) {
                setSuccess(true);
            }
            else {
                setErrorMessage(data.error)
            }
        } catch (err) {
            console.log(err)
        }
        setUser('');
        setMail('');
        setPwd('');
        setMatchPwd('');
    }

    return (
        <>
            {success ? (
                <section>
                    <h1 className='dark:text-white font-dmsans mb-2'>your account has been successfully created</h1>
                    <h1 className='dark:text-white text-3xl font-dmsans mb-5'>before logging in, please check your email + spam for a verification link!</h1>
                    <Link to='/login' className='hover:opacity-80 bg-gradient-to-br from-peach-400 to-peach-500 text-white px-4 py-2 rounded-md'>
                    login
                    </Link>
                </section>
            ) : (
                <section>
                    <div className='flex flex-col items-center justify-center w-full flex-1 text-center font-dmsans'>
                        <div className='bg-white dark:bg-backgroundc-300 rounded-md shadow-2xl flex w-10/12 max-w-4xl'>
                            <div className='w-10/12 p-5'>
                                <div className='text-left dark:text-white font-bold'>
                                    <span className='bg-clip-text text-transparent bg-gradient-to-r from-peach-200 to-peach-500'>note</span>point.
                                </div>
                                <div className='py-10'>
                                    <h2 className='text-3xl font-bold text-peach-400 mb-2'>register</h2>
                                    <div className='border-2 w-10 border-peach-400 inline-block mb-2'/>
                                    <p className='text-gray-400 dark:text-gray-100 mb-3'>username + email + password</p>

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
                                                onFocus={() => setUserFocus(true)}
                                                onBlur={() => setUserFocus(false)}
                                            />
                                        </div>
                                        {userFocus && user && !validName && (
                                            <p id="uidnote" className='text-gray-400 dark:text-gray-100 mb-3'>
                                                4 to 24 characters.<br />
                                                Must begin with a letter.<br />
                                                Letters, numbers, underscores, hyphens allowed.
                                            </p>
                                        )}

                                        <div className='bg-gray-100 w-64 p-2 flex items-cente mb-3 rounded-md'>
                                            <FaRegEnvelope className='text-gray-400 m-2'/>
                                            <input className='bg-gray-100 outline-none text-sm flex-1'
                                                type="text"
                                                id="email"
                                                placeholder='email'
                                                autoComplete="off"
                                                onChange={(e) => setMail(e.target.value)}
                                                value={mail}
                                                required
                                                onFocus={() => setMailFocus(true)}
                                                onBlur={() => setMailFocus(false)}
                                            />
                                        </div>
                                        {mailFocus && mail && !validMail && (
                                            <p id="mailnote" className='text-gray-400 dark:text-gray-100 mb-3'>
                                                Must include <span>@</span> and <span>.</span> with some letters or numbers in between.<br />
                                                Must specify a domain.
                                            </p>
                                        )}

                                        <div className='bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-md'>
                                            <MdLockOutline className='text-gray-400 m-2'/>
                                            <input className='bg-gray-100 outline-none text-sm flex-1'
                                                type="password"
                                                id="password"
                                                placeholder='password'
                                                onChange={(e) => setPwd(e.target.value)}
                                                value={pwd}
                                                required
                                                onFocus={() => setPwdFocus(true)}
                                                onBlur={() => setPwdFocus(false)}
                                            />
                                        </div>
                                        {pwdFocus && !validPwd && (
                                            <p id="pwdnote" className='text-gray-400 dark:text-gray-100 mb-3'>
                                                8 to 24 characters.<br />
                                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                                Allowed special characters: <span>!</span> <span>@</span> <span>#</span> <span>$</span> <span>%</span>
                                            </p>
                                        )}

                                        <div className='bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-md'>
                                            <MdLockOutline className='text-gray-400 m-2'/>
                                            <input className='bg-gray-100 outline-none text-sm flex-1'
                                                type="password"
                                                id="confirm_pwd"
                                                placeholder='confirm password'
                                                onChange={(e) => setMatchPwd(e.target.value)}
                                                value={matchPwd}
                                                required
                                                onFocus={() => setMatchFocus(true)}
                                                onBlur={() => setMatchFocus(false)}
                                            />
                                        </div>
                                        {matchFocus && !validMatch && (
                                            <p id="confirmnote" className='text-gray-400 dark:text-gray-100 mb-3'>
                                                Must match the first password input field.
                                            </p>
                                        )}

                                        <div className='mb-2'></div>
                                        <button className='border-2 border-peach-400 text-peach-400 rounded-md px-12 py-2 inline-block font-semibold dark:text-peach-400 hover:bg-peach-400 hover:text-white dark:hover:text-white' disabled={!validName || !validPwd || !validMatch ? true : false}>sign up</button>
                                    </form>
                                </div>
                            </div>
                            <div className='w-6/12 bg-peach-400 text-white rounded-r-md py-36 px-12'>
                                <h2 className='text-3xl font-bold'>already registered?</h2>
                                <div className='border-2 w-10 border-white inline-block mb-2'/>
                                <p className='mb-10'>welcome back!</p>
                                <Link to='/login' className='border-2 border-white rounded-md px-12 py-2 inline-block font-semibold hover:bg-white hover:text-peach-400'>sign in</Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default Register