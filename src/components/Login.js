import React from "react";
import {motion} from "framer-motion";

export default function Login(props) {
    return (
        <motion.main
            className="min-vh-100 min-vw-100 container row login-box"
            initial={{x: -window.innerWidth}}
            transition={{duration: 0.5}}
            animate={{x: 0}}
            exit={{x: -window.innerWidth, transition: {duration: 0.5}}}
        >
            <div className="d-none d-md-block my-auto col-md-6">
                <img className="rounded-end-5 float-start login-splash"
                     src={require("../assets/Login-Splash.png")}
                     alt="Bowl of various foods"/>
            </div>
            <div className="col-md-6 text-primary my-auto text-center">
                <h1 className="fw-bold">GoodbyeWaste</h1>
                <p className="h4">Welcome Back!</p>
                <br/>
                <form className="container">
                    <div className="mb-3 w-75 mx-auto">
                        <input type="email" className="form-control" id="email" placeholder="Email/Username"/>
                    </div>
                    <div className="mb-3 w-75 mx-auto">
                        <input type="password" className="form-control" id="password" placeholder="Password"/>
                    </div>
                    <div className="mb-3 w-75 mx-auto">
                        <button className="button-action bg-action text-white form-control">Log In</button>
                    </div>
                    <div className="container-fluid w-75">
                        <div className="row">
                            <hr className="border-2 col-5 my-auto"/>
                            <p className="col-2 my-auto">OR</p>
                            <hr className="border-2 col-5 my-auto"/>
                        </div>
                    </div>
                    <div className="mb-3 w-75 mx-auto">
                        <button className="button-google text-primary form-control">
                            <img className="me-3" src={require("../assets/Google-Logo.png")} alt="Google Logo"/>
                            Sign in with Google
                        </button>
                    </div>
                    <div className="mb-3 w-75 mx-auto text-start container row">
                        <div className="col-md-6">
                            <input className="me-3" type="checkbox" id="remember" name="remember"/>
                            <label className="h6" htmlFor="remember">Remember Password</label>
                        </div>
                        <div className="col-md-6">
                            <a className="link-underline link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover float-end h6">
                                Forgot Password
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </motion.main>
    );
}