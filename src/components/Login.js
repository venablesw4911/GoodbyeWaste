import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
    const navigate = useNavigate();
        
    const onButtonClick = () => {
        
        setEmailError("");
        setPasswordError("")

        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter your password")
            return
        }

        if (password.length < 10 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/.test([password])) {
            setPasswordError("The password must be 10 characters or longer")
            return
        }
    }

    return (
        <form className="container">
            <div className="height-row mb-3 w-75 mx-auto">
                <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="Email/Username"
                    onChange={ev => setEmail(ev.target.value)}/>
                <label className="height-row mb-3 w-75 mx-auto">{emailError}</label>
            </div>
            <div className="height-row mb-3 w-75 mx-auto">
                <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="Password"
                    onChange={ev => setPassword(ev.target.value)}/>
                <label className="height-row mb-3 w-75 mx-auto">{passwordError}</label>
            </div>
            <div className="height-row mb-3 w-75 mx-auto">
                <input 
                className="button-action bg-action text-white form-control"
                type="button"
                onClick={onButtonClick}
                value={"Log in"}/>
            </div>
            <div className="height-row mb-3 w-75 mx-auto text-start row">
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
            <div className="container-fluid w-75">
                <div className="row">
                    <hr className="border-2 col-5 my-auto"/>
                    <p className="col-2 my-auto">OR</p>
                    <hr className="border-2 col-5 my-auto"/>
                </div>
            </div>
            <br/>
            <div className="mb-3 w-75 mx-auto">
                <button className="button-google text-primary form-control">
                    <img className="me-3" src={require("../assets/Google-Logo.png")} alt="Google Logo"/>
                    Sign in with Google
                </button>
            </div>
            <br/>
        </form>
    )
}