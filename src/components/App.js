import React, { useState, useEffect } from "react"
import '../App.css'
import Header from "./Header.js"
import Footer from "./Footer.js"
import AnimatedRoutes from "./AnimatedRoutes.js"
import { useLocalStorage } from "@uidotdev/usehooks"
import { useLiveQuery } from "dexie-react-hooks"

export default function App(props) {

    // Fetch the user email and token from local storage
    const [user, setUser] = useLocalStorage('user', null)
    const [checked, setChecked] = useLocalStorage('isChecked', null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [email, setEmail] = useState('')

    console.log(user)
    console.log(checked)
    useEffect(() => {
        async function checkUser() {
            // If the token/email does not exist, mark the user as logged out
            if (!user || !user.token) {
                setLoggedIn(false)
                return
            }
            console.log(checked.isChecked)
            if (!checked || !checked.isChecked) {
                setIsChecked(false)
                return
            } else {
                setIsChecked(true)
            }
            // If the token exists, verify it with the auth server to see if it is valid
            const result = await fetch('http://localhost:3081/verify', {
                method: 'POST',
                headers: {
                    'jwt-token': user.token,
                },
            })

            if(result) {
                setLoggedIn(result.status === 200)
                setEmail(user.email || '')
            }
        }
        checkUser()
    }, [])

    return (
        <div className="overflow-x-hidden min-vh-100 bg-primary">
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <AnimatedRoutes setUser={setUser} setChecked={setChecked} isChecked={isChecked} email={email} setEmail={setEmail} setLoggedIn={setLoggedIn}/>
            <Footer/>
        </div>
    );
}