import React from "react";
import {motion} from "framer-motion";

export default function Login(props) {
    return (
        <motion.main
            className="min-vh-100 min-vw-100 container row"
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: window.innerWidth, transition: {duration: 0.5}}}
        >
            <div className="col-sm-4 mx-auto my-auto justify-content-center">
                <div className="card bg-transparent border-0">
                    <h2 className="text-center">Insert login form here</h2>
                </div>
            </div>
        </motion.main>
    );
}