export default function Footer(props) {
    return (
        <footer className="position-absolute w-100 bg-primary top-100 py-3">
            <hr/>
            <ul className="nav justify-content-center pb-3 mb-3">
                <li className="nav-item">
                    <a href="#" className="px-2">Home</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="px-2">Features</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="px-2">FAQs</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="px-2">About Us</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="px-2">Home</a>
                </li>
            </ul>
            <p className="text-center">© 2024 GoodbyeWaste, Inc</p>
        </footer>
    );
}