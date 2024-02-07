export default function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark col-12">
            <div className="container">
                <div className="row w-100">
                    <ul className="nav me-auto col-4">
                        <li className="nav-item my-auto">
                            <img src="/favicon.ico"/>
                        </li>
                        <li className="nav-item my-auto">
                            <a className="navbar-brand text-light" href="#">Logo</a>
                        </li>
                    </ul>
                    <form className="form-inline my-lg-0 col-4">
                        <ul className="nav">
                            <li className="nav-item ms-auto">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                       aria-label="Search"/>
                            </li>
                            <li className="nav-item me-auto">
                                <button className="btn btn-outline-success" type="submit">Search
                                </button>
                            </li>
                        </ul>
                    </form>
                    <ul className="nav col-4">
                        <li className="nav-item ms-auto my-auto">
                            <a className="text-light" href="#">Log in</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}