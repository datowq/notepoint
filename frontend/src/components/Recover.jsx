import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const URL = "http://localhost:3001";

function Recover(props) {
    const { id } = useParams();

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
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
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
        }
        setPwd('');
        setMatchPwd('');
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Your password has been successfully changed!</h1>
                    <h1>You can now login in with your new password.</h1>
                    <p>
                    <Link to='/'>Back to home.</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <h1>Create a new password</h1>
                    <form onSubmit={handleSubmit}>

                        <label htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "hide"}>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span>!</span> <span>@</span> <span>#</span> <span>$</span> <span>%</span>
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "hide"}>
                            Must match the first password input field.
                        </p>

                        <button disabled={!validPwd || !validMatch ? true : false}>Create new password</button>
                    </form>
                </section>
            )}
        </>
    )
}

export default Recover

