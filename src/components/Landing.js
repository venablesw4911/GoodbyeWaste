import React from "react"
import Carousel from 'react-bootstrap/Carousel';
import {motion} from "framer-motion";

export default function Landing(props) {
    return (
        <motion.main
            className="min-vh-100 min-vw-100 container row"
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{x: -window.innerWidth, transition: {duration: 0.5}}}
        >
            <div className="col-sm-12 my-auto justify-content-center">
                <div className="card bg-transparent border-0">
                    <h1 className="text-center">
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