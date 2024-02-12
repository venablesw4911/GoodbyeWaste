import {Link} from "react-router-dom";

export default function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary col-12 h4 fixed-top" role="navigation">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="row w-100">
                        <ul className="navbar-nav me-auto col-12 col-md-4">
                            <li className="d-none d-md-block nav-item my-auto">
                                <img src="/favicon.ico"/>
                            </li>
                            <li className="nav-item my-auto">
                                <Link className="nav-link text-primary navbar-brand p-3" to="/">GoodbyeWaste</Link>
                            </li>
                        </ul>
                        <form className="form-inline col-12 col-md-4">
                            <ul className="nav h-100">
                                <li className="nav-item my-auto mx-md-auto col-9">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                           aria-label="Search"/>
                                </li>
                                <li className="nav-item my-auto mx-md-auto col-3">
                                    <button className="btn btn-outline-dark" type="submit">Search
                                    </button>
                                </li>
                            </ul>
                        </form>
                        <ul className="navbar-nav me-auto col-12 col-md-4">
                            <li className="nav-item my-auto ms-md-auto">
                                <Link
                                    className="link-underline link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover text-primary navbar-brand p-3"
                                    to="/login">Log
                                    In</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}