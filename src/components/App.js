import React, { useEffect } from "react"
import '../App.css'
import Header from "./Header.js"
import Footer from "./Footer.js"
import AnimatedRoutes from "./AnimatedRoutes.js"
import { useLiveQuery } from "dexie-react-hooks"
import { dexieDB } from "../dexieDB.js"

export default function App(props) {

    // Fetch the user's login state from the database
    const userState = useLiveQuery(async () => {return await dexieDB.users.toArray()})
    const [user, setUser] = React.useState({
        token : '',
        email : '',
        userId : 0,
        loggedIn : false
    })

    // userState is an array only ever containing one object
    // It might be empty if the user has never logged in (so we use .?)
    useEffect(() => {
        console.log('Effect running')

        const token = userState?.[0]?.token
        const email = userState?.[0]?.email 
        const userId = userState?.[0]?.userId

        // If the token/email does not exist, mark the user as logged out
        if (!token) {
            return
        }

        async function checkUser() {
            // If the token exists, verify it with the auth server to see if it is valid
            const result = await fetch('http://localhost:3081/verify', {
                method: 'POST',
                headers: {
                    'jwt-token': token,
                },
            })

            if (result) {
                setUser({
                    ...user,
                    token,
                    email,
                    userId,
                    loggedIn: true
                })
            }
        }

        if (!user.loggedIn) {
            checkUser()
        }
    }, [userState, user])

    return (
        <div className="overflow-x-hidden min-vh-100 bgColor">
            <Header user={user}/>
            <AnimatedRoutes user={user}/>
            <Footer/>
        </div>
    );
}