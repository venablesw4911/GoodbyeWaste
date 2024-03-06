import {Route, Routes, useLocation} from "react-router-dom";
import Landing from "./Landing";
import AccountChange from "./AccountChange";
import SearchResults from "./SearchResults";

import {AnimatePresence} from "framer-motion"

export default function AnimatedRoutes(props) {
    const { searchResults } = props;
    const location = useLocation();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<AccountChange/>}/>
                <Route path="/search" element={<SearchResults search={searchResults}/>}/>
            </Routes>
        </AnimatePresence>
    )
}