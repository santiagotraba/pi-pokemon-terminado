import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DetailPage from "./Detailpage";
import "./Card.css";

const Card = ({
    id,
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    types,
}) => {
    return (
        <div className="card-pokemon">
            <img
                className="image-pokemon"
                src={image}
                alt="imagen del pokemon"
            />

            <Link to={`/detail/${id}`}>
                <h1>{name?.charAt(0).toUpperCase() + name?.slice(1)}</h1>
            </Link>
            <h2>{types?.join(", ")}</h2>
        </div>
    );
};

export default Card;
