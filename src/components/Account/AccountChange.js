import {useState} from "react";
import {motion} from "framer-motion";
import splash from "../../assets/Login-Splash.jpg";
import Login from "./Login.js";
import Signup from "./Signup.js";

export default function AccountChange(props) {
    const [isLogin, setIsLogin] = useState(true)
    let otherText = isLogin ? "Don't have an account" : "Already have an account";

    return (
        <motion.main
            className="max-vh-100 max-vw-100 container login-box"
            initial={{x: -window.innerWidth}}
            transition={{duration: 0.5}}
            animate={{x: 0}}
            exit={{x: -window.innerWidth, transition: {duration: 0.5}}}
        >
            <div className="d-flex justify-content-around align-items-center">
                <div className="login-splash-container w-75">
                    <img className="rounded-end-5 float-start login-splash"
                         src={splash}
                         alt="Bowl of various foods"/>
                </div>
                <div className="w-50 text-center w-25">
                    <h1 className="fw-bold home-text mb-5">GoodbyeWaste</h1>
                    <p className="h4 home-text">Welcome Back!</p>
                    <br/>
                    {isLogin ? <Login {...props} /> : <Signup {...props}/>}
                    <div className="mb-3 mt-0 w-75 mx-auto text-center">
                        <a className="home-text link-underline link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover h6"
                           onClick={
                               function () {
                                   return setIsLogin(prevState => !prevState);
                               }
                           }>{otherText}</a>
                    </div>
                </div>
            </div>
        </motion.main>
    );
}