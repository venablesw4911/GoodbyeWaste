import {Route, Routes, useLocation} from "react-router-dom"
import Landing from "./Landing.jsx"
import AccountChange from "./Account/AccountChange.jsx"
import SearchResults from "./Search/SearchResults.jsx"
import Planner from "./Planner/Planner.jsx"
import Profile from "./Account/Profile.jsx"
import {AnimatePresence} from "framer-motion"

export default function AnimatedRoutes(props) {
    const { user } = props
    const location = useLocation()
    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<AccountChange user={user}/>}/>
                <Route path="/search" element={<SearchResults user={user}/>}/>
                <Route path="/profile" element={<Profile user={user}/>}/>
            </Routes>
        </AnimatePresence>
    )
}