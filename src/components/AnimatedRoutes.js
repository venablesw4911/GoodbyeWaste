import {Route, Routes, useLocation} from "react-router-dom";
import Landing from "./Landing";
import Login from "./Login";

import {AnimatePresence} from "framer-motion"

export default function AnimatedRoutes(props) {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </AnimatePresence>
    )
}