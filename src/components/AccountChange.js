import {useState} from "react";
import {motion} from "framer-motion";
import splash from "../assets/Login-Splash.webp"
import Login from "./Login";
import Signup from "./Signup";

export default function AccountChange(props) {
    const [isLogin, setIsLogin] = useState(true);

    let otherText = isLogin ? "Sign Up" : "Sign In";

    return (
        <motion.main
            className="min-vh-100 min-vw-100 container row login-box"
            initial={{x: -window.innerWidth}}
            transition={{duration: 0.5}}
            animate={{x: 0}}
            exit={{x: -window.innerWidth, transition: {duration: 0.5}}}
        >
            <div className="d-none d-md-block my-auto col-md-6">
                <img className="rounded-end-5 float-start login-splash"
                     src={splash}
                     alt="Bowl of various foods"/>
            </div>
            <div className="col-md-6 text-primary my-auto text-center">
                <h1 className="fw-bold">GoodbyeWaste</h1>
                <p className="h4">Welcome Back!</p>
                <br/>
                {isLogin ? <Login/> : <Signup/>}
                <div className="mb-3 w-75 mx-auto text-center">
                    <a className="link-underline link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover h6"
                       onClick={
                           function () {
                               return setIsLogin(prevState => !prevState);
                           }
                       }>{otherText}</a>
                </div>
            </div>
        </motion.main>
    );
}