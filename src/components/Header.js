import Search from "./Search.js";
import {Link, useNavigate } from "react-router-dom";
import React, {useState, useEffect} from "react"

export default function Header(props) {

    const [loggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const [text, setText] = useState();
    const [searchResult, setSearchResult] = useState();

    const handleSubmit = () => {
        fetch(`https://api.edamam.com/search?q==${text}&app_id=ed3e6094&app_key=065fd89494e23e47cceae33090cf274d`)
            .then((response) => response.json())
            .then((data) => displayFoods2(data));   //setSearchResult(data));

        const displayFoods2 = foods => {
            console.log(foods);
            foods.hits.forEach(recipe => {
                console.log(`${recipe.recipe.label}`);
                console.dir(recipe.recipe);
            });
        }
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
        fetch('http://localhost:3081/verify', {
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

    const onButtonClick = e => {
        if (loggedIn) {
          localStorage.removeItem('user')
          props.setLoggedIn(false)
        } else {
          navigate('/login')
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary col-12 fixed-top header" role="navigation">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Search hideOnLarge={true}/>
                <div className="bg-primary pb-3 collapse navbar-collapse" id="navbarNav">
                    <div className="row w-100">
                        <ul className="navbar-nav me-auto col-12 col-md-4">
                            <li className="d-none d-md-block nav-item my-auto">
                                <img alt="GoodbyeWaste logo" src="/favicon.ico"/>
                            </li>
                            <li className="d-none d-md-block nav-item my-auto">
                                <Link className="nav-link text-primary navbar-brand p-3" to="/">GoodbyeWaste</Link>
                            </li>
                            <li className="d-block d-md-none nav-item my-auto">
                                <Link className="nav-link text-primary navbar-brand p-3" to="/">Home</Link>
                            </li>
                        </ul>
                        <form className="form-inline col-12 col-md-4">
                            <ul className="nav h-100">
                                <li className="nav-item my-auto mx-md-auto col-9">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                           aria-label="Search" onChange={(event) => setText(event.target.value)}/>
                                </li>
                                <li className="nav-item my-auto mx-md-auto col-3">
                                    <button className="btn btn-outline-dark" type="button" onClick={handleSubmit}>Search
                                    </button>
                                </li>
                            </ul>
                        </form>
                        <ul className="navbar-nav me-auto col-12 col-md-4">
                            <li className="nav-item my-auto ms-md-auto">
                                <div className={'buttonContainer'}>
                                    <input
                                    className={'button-action bg-action text-white form-control'}
                                    type="button"
                                    onClick={onButtonClick}
                                    value={/*loggedIn ? 'Log out' : */'Log in'}
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}