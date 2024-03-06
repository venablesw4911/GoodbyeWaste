import {Link, useNavigate } from "react-router-dom";
import React, {useState, useEffect} from "react"
import { render } from "react-dom";
import Offcanvas from 'react-bootstrap/Offcanvas'

// get our fontawesome imports
import { faMagnifyingGlass, faBasketShopping, faCalendarDay, faUser, faHouse, faRightFromBracket, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Header(props) {

    const [loggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        const searchResults = searchText; // Example results
        props.updateSearchResults(searchResults);
        navigate('/search')// Pass results to parent
    };

    useEffect(() => {
        // Fetch the user email and token from local storage
        const user = JSON.parse(localStorage.getItem('user'))

        // If the token/email does not exist, mark the user as logged out
        if (!user || !user.token) {
            setLoggedIn(false)
            return
        }

        // If the token exists, verify it with the auth server to see if it is valid
        fetch('http://localhost:3080/verify', {
            method: 'POST',
            headers: {
                'jwt-token': user.token,
            },
        })
            .then((r) => r.json())
            .then((r) => {
                setLoggedIn('success' === r.message)
                setEmail(user.email || '')
            })
    }, [])

    const onButtonClick = (e) => {
        if (loggedIn) {
            localStorage.removeItem('user')
            props.setLoggedIn(false)
        } else {
            navigate('/login')
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="row d-flex justify-content-between flex-fill mx-0">
                    <a className="navbar-brand col-auto me-0" href="/">
                        <img className="headerIMG d-none" src="/favicon.ico"/>
                        <span>GoodbyeWaste</span>
                    </a>

                    <form className="col-5 col-lg-4" role="search" onSubmit={handleSearch}>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search" aria-label="Search"
                                   onChange={(event) => setSearchText(event.target.value)}/>
                            <button className="btn btn-outline-primary" type="submit">
                                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg"/>
                            </button>
                        </div>
                    </form>

                    <div className="col-auto ">
                        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar"
                             aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header pb-1">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel"></h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                                        aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body ms-1 pt-1">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li className="nav-item">
                                        <a className="nav-link link-primary" href="#">
                                            <FontAwesomeIcon className="fa-fw me-2" icon={faBasketShopping} size="lg"/>
                                            Pantry
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link link-primary" href="#">
                                            <FontAwesomeIcon className="fa-fw me-2" icon={faCalendarDay} size="lg"/>
                                            Planner
                                        </a>
                                    </li>
                                    {/*
                                        <li className="nav-item">
                                            <a className="nav-link link-primary" href="#">
                                                <FontAwesomeIcon className="fa-fw me-2" icon={faCircleInfo} size="lg"/>
                                                About Us
                                            </a>
                                        </li>
                                    */}
                                    <li className="nav-item dropdown">
                                        {loggedIn ?
                                            <span>
                                                <a className="nav-link link-primary dropdown-toggle" href="#" role="button"
                                                   aria-expanded="false"
                                                   data-bs-toggle="dropdown">
                                                    <FontAwesomeIcon className="fa-fw me-2" icon={faUser} size="lg"/>
                                                    Account
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item link-primary" href="#">View Profile</a></li>
                                                    <li><a className="dropdown-item link-primary" href="#">Dietary Preferences</a></li>
                                                    <li>
                                                        <hr className="dropdown-divider"/>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item link-primary" href="#">
                                                            <FontAwesomeIcon className="fa-fw me-2" icon={faRightFromBracket}/>
                                                            Log out
                                                        </a>
                                                    </li>
                                                </ul>
                                            </span>
                                            :
                                            <a className="nav-link link-primary" href="#" role="button"
                                               aria-expanded="false"
                                               onClick={onButtonClick}>
                                                <FontAwesomeIcon className="fa-fw me-2" icon={faUser} size="lg"/>
                                                Log in
                                            </a>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasNavbar"
                                aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}