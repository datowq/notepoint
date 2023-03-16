import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { MdLockOutline } from 'react-icons/md';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const URL = import.meta.env.VITE_URL;

function Recover({setErrorMessage}) {
    const { id } = useParams();

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(URL + '/email/newpassword/' + id,
            {
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
        setPwd('');
        setMatchPwd('');
    }

    return (
        <>
            {success ? (
                <h1 className='font-dmsans dark:text-white text-3xl mb-[75vh]'>
                    your password has been successfully changed.<br/>
                    you can now log in with your new password.<br/>
                    <Link to='/login' className='text-peach-400'> log in </Link> 
                </h1>
            ) : (
                <section className="flex flex-col items-center justify-center w-full flex-1 text-center font-dmsans mb-12">
                    <div className="bg-white dark:bg-backgroundc-300 shadow-2xl rounded-md p-5 w-96">
                        <div className='text-left dark:text-white font-bold'>
                            <span className='bg-clip-text text-transparent bg-gradient-to-r from-peach-200 to-peach-500'>note</span>point.
                        </div>
                        <div className='py-10'>
                            <h1 className="text-peach-400 text-3xl font-bold mb-2">new password</h1>
                            <div className="border-2 w-10 border-peach-400 inline-block mb-2"/>
                            <form className="flex flex-col items-center p-2" onSubmit={handleSubmit}>
                                <div className='bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-md'>
                                    <MdLockOutline className='text-gray-400 m-2'/>
                                    <input className='bg-gray-100 outline-none text-sm flex-1'
                                        type="password"
                                        id="password"
                                        placeholder='password'
                                        autoComplete='off'
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false)}
                                    />
                                </div>
                                {pwdFocus && !validPwd && (
                                    <p id="pwdnote" className='text-gray-400 dark:text-gray-100 mb-3'>
                                        8 to 24 characters.<br/>
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
                                        autoComplete='off'
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

                                <button className="border-2 w-64 border-peach-400 text-peach-400 rounded-md px-10 py-2 inline-block font-semibold dark:text-peach-400 hover:bg-peach-400 hover:text-white dark:hover:text-white my-4" disabled={!validPwd || !validMatch ? true : false}>create new password</button>
                            </form>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default Recover

