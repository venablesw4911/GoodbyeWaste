import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css';
import App from './components/App.js';
import reportWebVitals from './reportWebVitals.js';
import Planner from "./pages/Planner.js";
import Profile from "./components/Profile.js";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<App/>}></Route>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/planner" element={<Planner/>}/>

            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
