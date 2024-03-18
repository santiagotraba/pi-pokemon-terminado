import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderByName, orderByAttack } from "../redux/action";

function Buttonorder() {
    const dispatch = useDispatch();
    const [order, setOrder] = useState("asc");
    const [attack, setAttack] = useState("asc");
    const pokemonsFilter = useSelector((state) => state?.pokemonsFilter);

    useEffect(() => {
        dispatch(orderByName, orderByAttack);
    }, []);

    const orderPokemons = (event) => {
        const direction = event.target.value;
        setOrder(direction);
        dispatch(orderByName(direction));
    };

    const orderAttack = (event) => {
        const direction = event.target.value;
        setAttack(direction);
        dispatch(orderByAttack(direction));
    };

    return (
        <div className="form form-select">
            <select value={order} onChange={orderPokemons}>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>
            <select value={attack} onChange={orderAttack}>
                <option value="asc">Min power</option>
                <option value="desc">Max power</option>
            </select>
        </div>
    );
}

export default Buttonorder;
