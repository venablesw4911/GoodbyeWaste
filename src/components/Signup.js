import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Signup(props) {
    let email
    let password
    let passwordConfirm
    const [error, setError] = useState("")

    const navigate = useNavigate()
        
    const handleSubmit = (event) => {
        
        event.preventDefault()
        email = event.target.email.value
        password = event.target.password.value
        passwordConfirm = event.target.passwordConfirm.value
        setError("");

        if ("" === email) {
            setError("Please enter your email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setError("Please enter a valid email")
            return
        }

        if ("" === password) {
            setError("Please enter a password")
            return
        }

        if (password.length < 10 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/.test([password])) {
            setError("The password must be 10 characters or longer, as well as contain an upper and lower case letter, a number, and a special character")
            return
        }
        if (passwordConfirm !== password) {
            setError("Passwords have to match")
            return
        }

        //will replace this with actual login
        // console.log(email)
        // console.log(password)
        // console.log(passwordConfirm)
        checkAccountExists((accountExists) => {
            // If yes, log in
            if (accountExists) logIn()
            // Else, ask user if they want to create a new account and if yes, then log in
            else if (window.confirm(
                'An account does not exist with this email address: ' + email + '. Do you want to create a new account?',
            )) { logIn() }
        })
    }

    // Call the server API to check if the given email ID already exists
    const checkAccountExists = (callback) => {
        fetch('http://localhost:3081/check-account', {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({ email }),
        })
          .then((r) => r.json())
          .then((r) => {
            callback(r?.userExists)
        })
    }

    const logIn = () => {
        //console.log(email)
        //console.log(password)
        //this will send to the auth server
        fetch('http://localhost:3081/auth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ email, password }),
        })
        .then((r) => r.json())
        .then((r) => {
            if ('success' === r.message) {
                localStorage.setItem('user', JSON.stringify({ email, token: r.token }))
                props.setLoggedIn(true)
                props.setEmail(email)
                navigate('App.js')
            } else {
                window.alert('Wrong email or password')
            }
        })
    }

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="height-row mb-3 w-75 mx-auto">
            <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="Email"/>
            </div>
            <div className="height-row mb-3 w-75 mx-auto">
                <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="Password"/>
            </div>
            <div className="height-row mb-3 w-75 mx-auto">
                <input
                    type="password" 
                    className="form-control" 
                    id="passwordConfirm" 
                    placeholder="Confirm password"/>
            </div>
            <div className="height-row mb-3 w-75 mx-auto">
            <button 
                className="button-action bg-action text-white form-control"
                type="submit">Create Account</button>
            </div>
            <p className="height-row mb-3 mx-auto text-danger">{error}</p>
            <div className="container-fluid w-75">
                <div className="row">
                    <hr className="border-2 col-4 col-md-5 my-auto"/>
                    <p className="col-4 col-md-2 my-auto">OR</p>
                    <hr className="border-2 col-4 col-md-5 my-auto"/>
                </div>
            </div>
            <br/>
            <div className="mb-1 w-75 mx-auto">
                <button className="button-google text-primary form-control">
                    <img className="me-3" src={require("../assets/Google-Logo.png")} alt="Google Logo"/>
                    Sign up with Google
                </button>
            </div>
            <br/>
        </form>
    )
}