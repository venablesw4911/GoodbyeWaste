import React from "react"
import Carousel from 'react-bootstrap/esm/Carousel.js';
import {motion} from "framer-motion";
import splash from "../assets/Landing-Splash.webp"

export default function Landing(props) {
    return (
        <motion.main
            className="min-vh-100 min-vw-100 container-fluid row"
            initial={{x: window.innerWidth}}
            transition={{duration: 0.5}}
            animate={{x: 0}}
            exit={{x: window.innerWidth, transition: {duration: 0.5}}}
            style={{
                backgroundImage: `url(${splash})`,
                backgroundSize: "auto auto",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center"
            }}
        >
            <div className="col-sm-12 my-auto justify-content-center">
                <div className="text-white card bg-transparent border-0">
                    <h1 className="display-1 fw-bold text-center">
                        Welcome to
                    </h1>
                    <Carousel interval={3000} controls={false} indicators={false}>
                        <Carousel.Item>
                            <p className="h4 text-center">Less Waste</p>
                        </Carousel.Item>
                        <Carousel.Item>
                            <p className="h4 text-center">Savings</p>
                        </Carousel.Item>
                        <Carousel.Item>
                            <p className="h4 text-center">New Recipes</p>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </motion.main>
    );
}