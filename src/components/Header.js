import {Link} from "react-router-dom";
import Search from "./Search";

export default function Header(props) {
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
                        <Search hideOnSmall={true}/>
                        <ul className="navbar-nav me-auto col-12 col-md-4">
                            <li className="nav-item my-auto ms-md-auto">
                                <Link
                                    className="h5 link-underline link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover text-primary p-3"
                                    to="/login"
                                >
                                    Log In
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}