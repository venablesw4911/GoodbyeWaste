import {Route, Routes, useLocation} from "react-router-dom"
import Landing from "./Landing.js"
import AccountChange from "./AccountChange.js"
import SearchResults from "./SearchResults.js"

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
            </Routes>
        </AnimatePresence>
    )
}