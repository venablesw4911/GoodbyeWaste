import '../App.css';

import Header from "./Header";
import Footer from "./Footer";
import AnimatedRoutes from "./AnimatedRoutes";

export default function App(props) {
    return (
        <div className="overflow-x-hidden min-vh-100 bg-primary">
            <Header/>
            <AnimatedRoutes/>
            <Footer/>
        </div>
    );
}
