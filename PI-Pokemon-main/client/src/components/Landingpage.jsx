import React from "react";
import "../styles/landingpage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="landingpage">
            <h1 className="bienvenidos">Bienvenidos</h1>
            <Link to={"/home"}>
                <button className="botonlanding">Ingresar</button>
            </Link>
        </div>
    );
};

export default LandingPage;
