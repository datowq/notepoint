import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

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
                <section>
                    <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <h1>Recover your account</h1>
                    <form onSubmit={handleSubmit}>
                        
                        <label htmlFor="username">
                            Email:
                        </label>
                        <input
                            type="text"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setMail(e.target.value)}
                            value={mail}
                            required
                            onFocus={() => setMailFocus(true)}
                            onBlur={() => setMailFocus(false)}
                        />
                        <p id="uidnote" className={mailFocus && mail && !validMail ? "instructions" : "hide"}>
                            Must include <span>@</span> and <span>.</span> with some letters or numbers in between.<br />
                            Must specify a domain.
                        </p>

                        <button disabled={!validMail ? true : false}>Send a recovery email</button>
                    </form>
                </section>
            )}
        </>
    )
}

export default Forgot