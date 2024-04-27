import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { dexieDB } from "../../dexieDB.js"

export default function Login(props) {
    let email;
    let password;
    let isChecked;
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (event) => {

        event.preventDefault()
        email = event.target.email.value
        password = event.target.password.value
        isChecked = event.target.remember.checked
        setError("");
        //console.log(isChecked)
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
    }

    // Log in a user using email and password
    const logIn = async () => {
    //console.log(email)
    //console.log(password)
    //this will send to the auth server
        const response = await fetch('http://localhost:3081/auth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ email, password }),
        })

        const result = await response.json()
        if (response.status === 200) {
            //localStorage.setItem('user', JSON.stringify({ email, token: response.token }))
            await dexieDB.users.put({
                email: email,
                token: result.token,
                userId: result.userId
            })
            navigate('/')
        } else {
            window.alert('Wrong email or password')
        }

    }

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="height-row mb-3 w-75 mx-auto">
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={props.user.isChecked ? props.user.email : null}/>
            </div>
            <div className="height-row mb-3 w-75 mx-auto">
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"/>
            </div>
            <div className="height-row mb-2 w-75 mx-auto">
                <button
                className="button-action bg-action home-text form-control"
                type="submit">Log In</button>
            </div>
            <p className="height-row my-0 mx-auto text-danger">{error}</p>
            <div className="height-row mb-3 w-75 mx-auto text-start row">
                <div className="col-md-6 text-center text-md-start">
                    <input className="me-md-3" type="checkbox" id="remember" name="remember"/>
                    <label className="h6 home-text" htmlFor="remember">Remember Email</label>
                </div>
                <div className="col-md-6 home-text">
                    <a className="home-text link-underline link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover float-md-end h6">
                        Forgot Password
                    </a>
                </div>
            </div>
        </form>
    )
}