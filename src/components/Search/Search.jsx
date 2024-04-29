export default function Search(props) {
    return (
        <form
            className={
                `form-inline col-8 col-md-4 
            ${props.hideOnLarge && "d-block d-md-none"} 
            ${props.hideOnSmall && "d-none d-md-block"}`}
        >
            <ul className="nav h-100">
                <li className="nav-item my-auto mx-md-auto col-9">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search"
                           aria-label="Search"/>
                </li>
                <li className="nav-item my-auto mx-md-auto col-3">
                    <button className="btn btn-outline-dark w-100 px-0 px-md-2" type="submit">Search
                    </button>
                </li>
            </ul>
        </form>
    );
}