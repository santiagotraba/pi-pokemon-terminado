import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LandingPage from "./components/Landingpage";
import HomePage from "./components/Homepage";
import React from "react";
import DetailPage from "./components/Detailpage";
import FormPage from "./components/Formpage";
import "./App.css";
import "./components/Forms.css";

function App() {
    const location = useLocation();
    const navigation = useNavigate();

    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
                <Route path="/form" element={<FormPage />} />
            </Routes>
        </>
    );
}

export default App;
