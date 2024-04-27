import {Route, Routes, useLocation} from "react-router-dom"
import Landing from "./Landing.js"
import AccountChange from "./Account/AccountChange.js"
import SearchResults from "./Search/SearchResults.js"
import Profile from "./Account/Profile.js"

import {AnimatePresence} from "framer-motion"

export default function AnimatedRoutes(props) {
    // const { setLoggedIn, setEmail, email, ...rest } = props
    const location = useLocation()

    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<AccountChange {...props}/>}/>
                <Route path="/search" element={<SearchResults {...props}/>}/>
                <Route path="/profile" element={<Profile {...props}/>}/>
            </Routes>
        </AnimatePresence>
    )
}