import '../App.css';

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

export default function App() {
    return (
        <div className="min-vh-100">
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
}
