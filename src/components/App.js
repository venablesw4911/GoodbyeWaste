import React, { useState } from "react"
import '../App.css';
import Header from "./Header";
import Footer from "./Footer";
import AnimatedRoutes from "./AnimatedRoutes";

export default function App(props) {
    const [searchResults, setSearchResults] = useState([]);

    // Function to update search results
    const updateSearchResults = (results) => {
        setSearchResults(results);
    };

    return (
        <div className="overflow-x-hidden min-vh-100 bg-primary">
            <Header updateSearchResults={updateSearchResults}/>
            <AnimatedRoutes searchResults={searchResults}/>
            <Footer/>
        </div>
    );
}