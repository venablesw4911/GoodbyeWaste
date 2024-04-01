import React, { useState, useEffect } from "react"
import '../App.css'
import Header from "./Header.js"
import Footer from "./Footer.js"
import AnimatedRoutes from "./AnimatedRoutes.js"
import { useLocalStorage } from "@uidotdev/usehooks"
import { useLiveQuery } from "dexie-react-hooks"
import { dexieDB } from "../dexieDB.js"

export default function App(props) {

    // Fetch the user's login state from the database
    const userState = useLiveQuery(() => dexieDB.users.toArray())
    const user = {
        token : '',
        email : '',
        checked : false,
        loggedIn : false
    }
    // userState is an array only ever containing one object
    // It might be empty if the user has never logged in (so we use .?)
    const token = userState?.[0]?.token  
    const email = userState?.[0]?.email 
    const checked = userState?.[0]?.checked

    // Fetch the user email and token from local storage
    // const [user, setUser] = useLocalStorage('user', null)
    // const [checked, setChecked] = useLocalStorage('isChecked', null)
    // const [loggedIn, setLoggedIn] = useState(false)
    // const [isChecked, setIsChecked] = useState(false)
    // const [email, setEmail] = useState('')

    // console.log(user)
    // console.log(checked)
    useEffect(() => {
        async function checkUser() {
            // If the token/email does not exist, mark the user as logged out
            if (token) {
                user.loggedIn = false
                return
            }
            // If the token exists, verify it with the auth server to see if it is valid
            const result = await fetch('http://localhost:3081/verify', {
                method: 'POST',
                headers: {
                    'jwt-token': token,
                },
            })

            if(result) {
                user.token = token
                user.email = email
                user.loggedIn = true
            }
            if(checked) {
                user.checked = true
            }
        }
        checkUser()
    }, [])

    return (
        <div className="overflow-x-hidden min-vh-100 bg-primary">
            <Header user={user}/>
            <AnimatedRoutes user={user}/>
            <Footer/>
        </div>
    );
}