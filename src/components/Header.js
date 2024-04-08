import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react"
import { dexieDB } from "../dexieDB.js"

// Fontawesome imports
import { faMagnifyingGlass, faBasketShopping, faCalendarDay, faUser, faHouse, faRightFromBracket, faCircleInfo, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const allergies = ['Celery-Free', 'Crustacean-Free', 'Dairy-Free', 'Egg-Free', 'Fish-Free', 'Gluten-Free', 'Lupine-Free', 'Mustard-Free', 'Peanut-Free', 'Sesame-Free', 'Shellfish-Free', 'Soy-Free', 'Tree-Nut-Free', 'Wheat-Free'];
const health = ['Vegetarian', 'Vegan', 'Pork-Free', 'Red-Meat-Free', 'Keto-Friendly', 'Kosher', 'Low-sugar', 'Paleo', 'Pescatarian'];
const diets = ['High-Fiber', 'Balanced', 'High-Protein', 'Low-Carb', 'Low-Fat', 'Low-Sodium'];
const macroNutrients = ['Fat', 'Saturated', 'Trans', 'Monounsaturated', 'Polyunsaturated', 'Carbs', 'Fiber', 'Sugars', 'Protein'];
const microNutrients = ['Cholesterol', 'Sodium', 'Calcium', 'Magnesium', 'Postassium', 'Iron', 'Vitamin A', 'Vitamin C', 'Thiamin (B1)', 'Riboflavin (B2)', 'Niacin (B3)', 'Vitamin B12', 'Vitamin D', 'Vitamin E', 'Vitamin K'];

export default function Header(props) {

    const location = useLocation();
    const navigate = useNavigate()

    //for grey
    //const [loggedIn, setLoggedIn] = props;

    const [searchText, setSearchText] = useState('');
    const [searchDiet, setSearchDiet] = useState('');
    const [searchHealth, setSearchHealth] = useState([]);
    const [showSearchFilters, setShowSearchFilters] = useState(false);

    useEffect(() => {
        // Fetch allergy diets when component mounts
        async function fetchAllergyDiets() {
            const response = await fetch('http://localhost:3081/get-allergies');
            const data = await response.json();
            //console.log(data)
            const response1 = await fetch('http://localhost:3081/get-diets');
            const data1 = await response1.json();
            //console.log(data1)
        }

        fetchAllergyDiets();
    }, []);

    // On change of location, hide search filters collapse
    useEffect(() => {
        setShowSearchFilters(false); // Close the navigation panel
    }, [ location ]);

    // Toggle search filter collapse state
    const toggleCollapse = () => {
        setShowSearchFilters(!showSearchFilters);
    };

    // On submit of search form, send search data as params to SearchResults component
    const handleSearch = (e) => {
        e.preventDefault();
        let searchString = `/search?search=${searchText}`;
        if (searchDiet) {
            searchString += `&diet=${searchDiet}`;
        }
        if (searchHealth.length > 0) {
            searchString += `&health=${searchHealth.join(',')}`;
        }
        setShowSearchFilters(false);
        navigate(searchString);
    };

    const onButtonClick = e => {
        if (props.user.loggedIn) {
            dexieDB.users.clear()
            window.location.reload();
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
                            <button className="btn btn-outline-primary dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseExample"
                                    onClick={toggleCollapse}
                                    aria-expanded={showSearchFilters}>
                                All
                            </button>
                            <input type="text" className="form-control clickable border-end-0" placeholder="Search"
                                   aria-label="Search"
                                   onChange={(event) => setSearchText(event.target.value)}/>
                            <label className="input-group-text bg-white border-start-0" onClick={handleSearch}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg"
                                                 style={{cursor: "pointer", color: "#ced4da"}}/>
                            </label>
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
                                        {props.user.loggedIn ?
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
                                                        <a className="dropdown-item link-primary" href="#" onClick={onButtonClick}>
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
            <div className={`collapse ${showSearchFilters ? 'show' : ''}`} id="collapseExample">
                <div className="card card-body rounded-0 d-flex flex-row justify-content-between flex-wrap">
                    <div>
                        <h5>Allergies</h5>
                        <ul className="p-0" style={{ listStyleType: "none" }}>
                            {allergies.map((item, index) => (
                                <li key={0+index} className="my-1">
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
                                <li key={1+index} className="my-1">
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
                                <li key={2+index} className="my-1">
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
                        <ul>
                            {microNutrients.map((item, index) => (
                                <li key={index} className="my-1" style={{listStyleType: "none"}}>
                                    <FontAwesomeIcon className="me-1" icon={faPlus} size="lg" style={{cursor: "pointer", color: "#ced4da"}}/>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h5>Micronutrients</h5>
                        <ul>
                            {macroNutrients.map((item, index) => (
                                <li key={index} className="my-1" style={{listStyleType: "none"}}>
                                    <FontAwesomeIcon className="me-1" icon={faPlus} size="lg"
                                                     style={{cursor: "pointer", color: "#ced4da"}}/>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}