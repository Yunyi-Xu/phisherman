import { useRef, useState, useEffect, useContext } from 'react';

import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import bgimg from './background.jpg'

const SIGNIN_URL = '/account/register';


const Signup = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [cpwd, setCPwd] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd,cpwd])



    const handleSubmit = async (e) => {

        //Prevent a browser reload/refresh when submitting the form

        e.preventDefault();

        if (pwd !== cpwd){
            console.log("Password doesn't align.");
            setErrMsg('Password doesn\'t align.');
            errRef.current.focus();
        }

        const response = await axios.post(SIGNIN_URL,
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
            setCPwd('');
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
                    <h2 className="text-white">Sign up</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Username input */}
                        <div className="form-outline mb-4">
                            <label htmlFor="username" className="form-label text-white">Username:  </label>
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

                            <label htmlFor="password" className="form-label text-white">Password: </label>
                            <input
                                type="password"
                                id="password"
                                autoComplete="off"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                        </div>
                        <div className="form-outline mb-4">

                            <label htmlFor="cpassword" className="form-label text-white">Confirm Pwd:</label>
                            <input
                                type="password"
                                id="cpassword"
                                autoComplete="off"
                                onChange={(e) => setCPwd(e.target.value)}
                                value={cpwd}
                                required
                            />
                        </div>
                        <button className="btn btn-light btn-block mb-4">Sign In</button>
                        
                        {/* Login buttons */}
                        <div className="text-center">
                            <p className="text-white">Have an account? <a className="text-white" href="#!">Log in</a></p>
                        </div>
                    </form>

                </section>
            )}
        </>
    )
}

export default Signup