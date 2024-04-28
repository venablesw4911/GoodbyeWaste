import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css';
import App from './components/App.jsx';
import reportWebVitals from './reportWebVitals.js';
import Profile from "./components/Account/Profile.jsx";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<App/>}></Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
