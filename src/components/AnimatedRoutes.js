import {Route, Routes, useLocation} from "react-router-dom";
import Landing from "./Landing.js";
import AccountChange from "./AccountChange.js";

import {AnimatePresence} from "framer-motion"

export default function AnimatedRoutes(props) {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<AccountChange/>}/>
            </Routes>
        </AnimatePresence>
    )
}