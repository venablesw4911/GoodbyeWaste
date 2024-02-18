import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()
        
    const onButtonClick = () => {
        
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
            setError("Please enter your password")
            return
        }
        logIn()
    // Check if email has an account associated with it
    // checkAccountExists((accountExists) => {
    //     // If yes, log in
    //     if (accountExists) logIn()
    //     // Else, ask user if they want to create a new account and if yes, then log in
    //     else if (
    //         window.confirm(
    //         'An account does not exist with this email address: ' + email + '. Do you want to create a new account?',
    //         )
    //     ) { logIn() }
    // })
}

    // Call the server API to check if the given email ID already exists
// const checkAccountExists = (callback) => {
//     fetch('http://localhost:3080/check-account', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email }),
//     })
//       .then((r) => r.json())
//       .then((r) => {
//         callback(r?.userExists)
//       })
//   }
  
  // Log in a user using email and password
  const logIn = () => {
    console.log(JSON.stringify({ email, password }))
    //this will send to the auth server
    // fetch('http://localhost:3080/auth', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, password }),
    // })
    //   .then((r) => r.json())
    //   .then((r) => {
    //     if ('success' === r.message) {
    //       localStorage.setItem('user', JSON.stringify({ email, token: r.token }))
    //       props.setLoggedIn(true)
    //       props.setEmail(email)
    //       navigate('App.js')
    //     } else {
    //       window.alert('Wrong email or password')
    //     }
    //   })
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
            </div>
            <div className="height-row mb-3 w-75 mx-auto">
                <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="Password"
                    onChange={ev => setPassword(ev.target.value)}/>
            </div>
            <div className="height-row mb-2 w-75 mx-auto">
                <input 
                className="button-action bg-action text-white form-control"
                type="button"
                onClick={onButtonClick}
                value={"Log in"}/>
            </div>
            <p className="height-row my-0 mx-auto text-danger">{error}</p>
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