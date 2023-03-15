import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRegEnvelope } from 'react-icons/fa';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const URL = import.meta.env.VITE_URL;

const Forgot = () => {

    const [mail, setMail] = useState('');
    const [validMail, setValidMail] = useState(false);
    const [mailFocus, setMailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidMail(EMAIL_REGEX.test(mail));
        setErrMsg('');
    }, [mail])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(URL + '/email/recover',
            {
                email: mail,
            }
            );
            const data = response.data;
            console.log(data);
            if (!data.error) {
                setSuccess(true);
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
        }
        setMail('');

    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Check your email for a link that will allow you to create a new password.</h1>
                    <p>
                    <Link to='/'>Back to home.</Link>
                    </p>
                </section>
            ) : (
                <section className="flex flex-col items-center justify-center w-full flex-1 text-center font-dmsans">
                    <div className="bg-white dark:bg-backgroundc-300 shadow-2xl rounded-md p-5">
                    <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <div className='text-left dark:text-white font-bold'>
                                <span className='bg-clip-text text-transparent bg-gradient-to-r from-peach-200 to-peach-500'>note</span>point.
                            </div>
                    <div className='py-10'>
                    <h1 className="text-peach-400 text-3xl font-bold mb-2">password reset</h1>
                    <div className="border-2 w-10 border-peach-400 inline-block mb-2"/>
                    <form className="flex flex-col items-center p-2" onSubmit={handleSubmit} >
  
                        <div className='bg-gray-100 w-64 p-2 flex items-center mb-2 rounded-md'>
                        <FaRegEnvelope className='text-gray-400 m-2'/>
                        <input className='bg-gray-100 outline-none text-sm flex-1'
                            type="text"
                            id="email"
                            placeholder="email"
                            autoComplete="off"
                            onChange={(e) => setMail(e.target.value)}
                            value={mail}
                            required
                            onFocus={() => setMailFocus(true)}
                            onBlur={() => setMailFocus(false)}
                        />
                        </div>
                        <p id="uidnote" className={mailFocus && mail && !validMail ? "instructions " : "hide"}>
                            <div className="text-gray-400 dark:text-gray-100 mb-3 p-2">
                            Must include <span>@</span> and <span>.</span> with some letters or numbers in between.<br />
                            Must specify a domain.
                            </div>
                        </p>


                        <button className="border-2 border-peach-400 text-peach-400 rounded-md px-16 py-2 inline-block font-semibold dark:text-peach-400 hover:bg-peach-400 hover:text-white dark:hover:text-white" disabled={!validMail ? true : false}>send email</button>
                    </form>
                    </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default Forgot