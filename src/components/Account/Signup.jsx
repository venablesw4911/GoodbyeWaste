import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { dexieDB } from "../../dexieDB.js"

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
        createAccount()
    }

    const createAccount = async () => {
        //console.log(email)
        //console.log(password)
        //this will send to the auth server
        const response = await fetch('http://localhost:3081/create-account', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ email, password }),
        })

        const result = await response.json()
        if (response.status === 200) {
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
            </div>
        </form>
    )
}