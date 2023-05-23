import { useRef, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import bgimg from './background.jpg'

const LOGIN_URL = '/account/login';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {

        //Prevent a browser reload/refresh when submitting the form

        e.preventDefault();

        const response = await axios.post(LOGIN_URL,
            { username: user, password: pwd });
        console.log(JSON.stringify(response?.data?.data?.id)); //Optional Chaining
        if (response?.data?.data?.id === -1 || response?.data?.data?.id === -2) {
            console.log("Login Failed");
            setErrMsg('Login Failed');
            errRef.current.focus();
        } else {
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);

        }


    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>

                </section>
            ) : (
                <section style={{ backgroundImage: `url(${bgimg})`, backgroundSize: "contain", height: "100vh" }}>
                    <p ref={errRef} className={errMsg ? "errmsg text-danger" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className="text-white">Welcome to Phisherman!</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Username input */}
                        <div className="form-outline mb-4">
                            <label htmlFor="username" className="form-label text-white">Username:</label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                        </div>
                        {/* Password input */}
                        <div className="form-outline mb-4">

                            <label htmlFor="password" className="form-label text-white">Password:</label>
                            <input
                                type="password"
                                id="password"
                                autoComplete="off"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                        </div>
                        <div className="row mb-4">
                            <div className="col d-flex justify-content-center">
                                {/* Checkbox */}
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                                    <label className="form-check-label text-white" htmlFor="form2Example31"> Remember me </label>
                                </div>
                            </div>

                            <div className="col">
                                {/* Simple link */}
                                <a className="text-white" href="#!">Forgot password?</a>
                            </div>
                        </div>
                        <button className="btn btn-light btn-block mb-4">Sign In</button>
                        {/* Register buttons */}
                        <div className="text-center">
                            <p className="text-white">Not a member? <a className="text-white" href="#!">Register</a></p>
                            <p className="text-white">or sign up with:</p>
                            <img src="https://www.uvic.ca/brand/assets/images/graphics/misc/UVic-mark.jpg" alt="uvic logo" />
                        </div>
                    </form>

                </section>
            )}
        </>
    )
}

export default Login