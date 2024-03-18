import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react"

// get our fontawesome imports
import { faMagnifyingGlass, faBasketShopping, faCalendarDay, faUser, faHouse, faRightFromBracket, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const allergies = ['Celery-Free', 'Crustacean-Free', 'Dairy-Free', 'Egg-Free', 'Fish-Free', 'Gluten-Free', 'Lupine-Free', 'Mustard-Free', 'Peanut-Free', 'Sesame-Free', 'Shellfish-Free', 'Soy-Free', 'Tree-Nut-Free', 'Wheat-Free'];
const health = ['Vegetarian', 'Vegan', 'Pork-Free', 'Red-Meat-Free', 'Keto-Friendly', 'Kosher', 'Low-sugar', 'Paleo', 'Pescatarian'];
const diets = ['High-Fiber', 'Balanced', 'High-Protein', 'Low-Carb', 'Low-Fat', 'Low-Sodium'];

export default function Header(props) {
    const location = useLocation();
    const [collapseOpen, setCollapseOpen] = useState(false);

    const [loggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState('')

    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('');
    const [searchDiet, setSearchDiet] = useState('');
    const [searchHealth, setSearchHealth] = useState([]);

    useEffect(() => {
        setCollapseOpen(false); // Close the navigation panel
    }, [ location ]);

    // Toggle collapse state
    const toggleCollapse = () => {
        setCollapseOpen(!collapseOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        let searchString = `/search?search=${searchText}`;
        if (searchDiet) {
            searchString += `&diet=${searchDiet}`;
        }
        if (searchHealth.length > 0) {
            searchString += `&health=${searchHealth.join(',')}`;
        }
        setCollapseOpen(false);
        navigate(searchString);
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
                            <button className="btn btn-outline-primary dropdown-toggle" type="button"
                                    /*data-bs-toggle="collapse" data-bs-target="#collapseExample"*/
                                    onClick={toggleCollapse}>
                                All
                            </button>
                            <input type="text" className="form-control clickable border-end-0" placeholder="Search"
                                   aria-label="Search"
                                   onChange={(event) => setSearchText(event.target.value)}/>
                            <label className="input-group-text bg-white border-start-0" onClick={handleSearch}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg"
                                                 style={{cursor: "pointer", color: "#ced4da"}}/>
                            </label>
                            {/*<button className="btn btn-outline-secondary" type="submit">
                                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg"/>
                            </button>*/}
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
                                                <a className="nav-link link-primary dropdown-toggle" href="#"
                                                   role="button"
                                                   aria-expanded="false"
                                                   data-bs-toggle="dropdown">
                                                    <FontAwesomeIcon className="fa-fw me-2" icon={faUser} size="lg"/>
                                                    Account
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item link-primary"
                                                           href="#">View Profile</a></li>
                                                    <li><a className="dropdown-item link-primary" href="#">Dietary Preferences</a></li>
                                                    <li>
                                                        <hr className="dropdown-divider"/>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item link-primary" href="#">
                                                            <FontAwesomeIcon className="fa-fw me-2"
                                                                             icon={faRightFromBracket}/>
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
            <div className={`collapse ${collapseOpen ? 'show' : ''}`} id="collapseExample">
                <div className="card card-body rounded-0 d-flex flex-row justify-content-between flex-wrap">
                    <div>
                        <h5>Allergies</h5>
                        <ul className="p-0" style={{ listStyleType: "none" }}>
                            {allergies.map((item, index) => (
                                <li className="my-1">
                                    <input className="form-check-input me-1"
                                           type="checkbox"
                                           value={item.toLowerCase()}
                                           id={'allergy-' + index}
                                           onChange={(e) => setSearchHealth(prevState => {
                                               if (prevState.includes(e.target.value)) {
                                                   return prevState.filter(item => item !== e.target.value);
                                               } else {
                                                   return [...prevState, e.target.value];
                                               }
                                           })}
                                    />
                                    <label className="form-check-label small" htmlFor={'allergy-' + index}>
                                        {item}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h5>Diets</h5>
                        <ul className="p-0" style={{listStyleType: "none"}}>
                            {health.map((item, index) => (
                                <li className="my-1">
                                    <input className="form-check-input me-1"
                                           type="checkbox"
                                           value={item.toLowerCase()}
                                           id={'diet-' + index}
                                           onChange={(e) => setSearchHealth(prevState => {
                                               if (prevState.includes(e.target.value)) {
                                                   return prevState.filter(item => item !== e.target.value);
                                               } else {
                                                   return [...prevState, e.target.value];
                                               }
                                           })}
                                    />
                                    <label className="form-check-label small" htmlFor={'diet-' + index}>
                                        {item === 'Keto-Friendly' ? 'Keto' : item}
                                    </label>
                                </li>
                            ))}
                            {diets.map((item, index) => (
                                <li className="my-1">
                                    <input className="form-check-input me-1"
                                           type="radio"
                                           value={item.toLowerCase()}
                                           name="diets"
                                           id={'diet-' + (index + health.length)}
                                           onChange={(e) => setSearchDiet(e.target.value)}
                                    />
                                    <label className="form-check-label small" htmlFor={'diet-' + (index + health.length)}>
                                        {item}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                    <h5>Macronutrients</h5>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="macroNut1"/>
                            <label className="form-check-label small" htmlFor="macroNut1">
                                Fat
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="macroNut2"/>
                            <label className="form-check-label small" htmlFor="macroNut2">
                                Saturated
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="macroNut3"/>
                            <label className="form-check-label small" htmlFor="macroNut3">
                                Trans
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="macroNut4"/>
                            <label className="form-check-label small" htmlFor="macroNut4">
                                Monounsaturated
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="macroNut5"/>
                            <label className="form-check-label small" htmlFor="macroNut5">
                                Polyunsaturated
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="macroNut6"/>
                            <label className="form-check-label small" htmlFor="macroNut6">
                                Carbs
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="macroNut7"/>
                            <label className="form-check-label small" htmlFor="macroNut7">
                                Fiber
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="macroNut8"/>
                            <label className="form-check-label small" htmlFor="macroNut8">
                                Sugars
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="macroNut9"/>
                            <label className="form-check-label small" htmlFor="macroNut9">
                                Protein
                            </label>
                        </div>
                    </div>

                    <div>
                        <h5>Micronutrients</h5>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="microNut1"/>
                            <label className="form-check-label small" htmlFor="microNut1">
                                Cholesterol
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="microNut2"/>
                            <label className="form-check-label small" htmlFor="microNut2">
                                Sodium
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="microNut3"/>
                            <label className="form-check-label small" htmlFor="microNut3">
                                Calcium
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="microNut4"/>
                            <label className="form-check-label small" htmlFor="microNut4">
                                Magnesium
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="microNut5"/>
                            <label className="form-check-label small" htmlFor="microNut5">
                                Postassium
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="microNut6"/>
                            <label className="form-check-label small" htmlFor="microNut6">
                                Iron
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="microNut7"/>
                            <label className="form-check-label small" htmlFor="microNut7">
                                Vitamin A
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="microNut8"/>
                            <label className="form-check-label small" htmlFor="microNut8">
                                Vitamin C
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="microNut9"/>
                            <label className="form-check-label small" htmlFor="microNut9">
                                Thiamin (B1)
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="microNut10"/>
                            <label className="form-check-label small" htmlFor="microNut10">
                                Riboflavin (B2)
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="microNut11"/>
                            <label className="form-check-label small" htmlFor="microNut11">
                                Niacin (B3)
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="microNut12"/>
                            <label className="form-check-label small" htmlFor="microNut12">
                                Vitamin B12
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="microNut13"/>
                            <label className="form-check-label small" htmlFor="microNut13">
                                Vitamin D
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="microNut14"/>
                            <label className="form-check-label small" htmlFor="microNut14">
                                Vitamin E
                            </label>
                        </div>
                        <div className="my-1">
                            <input className="form-check-input me-1" type="checkbox" value=""
                                   id="microNut15"/>
                            <label className="form-check-label small" htmlFor="microNut15">
                                Vitamin K
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}