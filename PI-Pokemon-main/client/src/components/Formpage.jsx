import React, { useEffect } from "react";
import {
    validationName,
    validationImage,
    validationHp,
    validationAttack,
    validationDefense,
    validationSpeed,
    validationHeight,
    validationWeight,
} from "./validation";
import { useState } from "react";
import { createPokemon, getTypes } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import "./Formpage.css";
import { Link } from "react-router-dom";

const FormPage = () => {
    const types = useSelector((state) => state?.types);

    const dispatch = useDispatch();

    const [data, setData] = useState({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
    });

    const [error, setError] = useState({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
    });

    const [create, setCreate] = useState(false);

    useEffect(() => {
        dispatch(getTypes());
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "types") {
            setData({ ...data, [name]: [...data.types, value] });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setCreate(false);
        if (
            !validationName(data.name) &&
            !validationImage(data.image) &&
            !validationHp(data.hp) &&
            !validationAttack(data.attack) &&
            !validationDefense(data.defense) &&
            !validationSpeed(data.speed) &&
            !validationHeight(data.height) &&
            !validationWeight(data.weight)
        ) {
            alert("No se a creado el pokemon debido a la falta de datos");
            setCreate(false);
            return;
        } else {
            setCreate(true);
            setData({
                name: "",
                image: "",
                hp: "",
                attack: "",
                defense: "",
                speed: "",
                height: "",
                weight: "",
                types: [],
            });
            dispatch(createPokemon(data));
        }
    };

    const handleInputBlur = () => {
        const regexImage = /\.(jpeg|jpg|gif|png)$/i.test(data.image);
        const regexStats = /^\d+$/.test(
            data.hp,
            data.attack,
            data.defense,
            data.speed,
            data.height,
            data.weight
        );

        setError((prevState) => ({
            ...prevState,
            name: data.name.length === 0 ? "El campo no puede estar vacío" : "",
            image:
                data.image.length === 0
                    ? "El campo no puede estar vacío"
                    : !regexImage
                    ? "El link ingresado debe ser una imagen"
                    : "",
            hp:
                data.hp.length === 0
                    ? "El campo no puede estar vacio"
                    : !regexStats
                    ? "La vida debe ser solo numeros"
                    : "",
            attack:
                data.attack.length === 0
                    ? "El campo no puede estar vacio"
                    : !regexStats
                    ? "El ataque debe ser solo numeros"
                    : "",
            defense:
                data.defense.length === 0
                    ? "El campo no puede estar vacio"
                    : !regexStats
                    ? "La defensa debe ser solo numeros"
                    : "",
            speed:
                data.speed.length === 0
                    ? "El campo no puede estar vacio"
                    : !regexStats
                    ? "La velocidad debe ser solo numeros"
                    : "",
            height:
                data.height.length === 0
                    ? "El campo no puede estar vacio"
                    : !regexStats
                    ? "La altura debe ser solo numeros"
                    : "",
            weight:
                data.weight.length === 0
                    ? "El campo no puede estar vacio"
                    : !regexStats
                    ? "El peso debe ser solo numeros"
                    : "",
        }));
    };

    const handleCreate = () => {
        setCreate("El pokemon fue creado con exito");
    };

    return (
        <div className="form-create">
            <form className="camp" onSubmit={handleSubmit}>
                <div className="campo">
                    <label htmlFor="name">Name: </label>
                    <input
                        className="input-form"
                        value={data.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        id="name"
                        onBlur={handleInputBlur}
                    />
                    {error.name && (
                        <label style={{ color: "#922F6C", fontWeight: "bold" }}>
                            {error.name}
                        </label>
                    )}
                </div>

                <div className="campo">
                    <label htmlFor="image">Image: </label>
                    <input
                        className="input-form"
                        value={data.image}
                        onChange={handleChange}
                        type="text"
                        name="image"
                        id="image"
                        onBlur={handleInputBlur}
                    />
                    {error.image && (
                        <label style={{ color: "#922F6C", fontWeight: "bold" }}>
                            {error.image}
                        </label>
                    )}
                </div>

                <div className="campo">
                    <label htmlFor="hp">Hp: </label>
                    <input
                        className="input-form"
                        value={data.hp}
                        onChange={handleChange}
                        type="text"
                        name="hp"
                        id="hp"
                        onBlur={handleInputBlur}
                    />
                    {error.hp && (
                        <label style={{ color: "#922F6C", fontWeight: "bold" }}>
                            {error.hp}
                        </label>
                    )}
                </div>

                <div className="campo">
                    <label htmlFor="attack">Attack: </label>
                    <input
                        className="input-form"
                        value={data.attack}
                        onChange={handleChange}
                        type="text"
                        name="attack"
                        id="attack"
                        onBlur={handleInputBlur}
                    />
                    {error.attack && (
                        <label style={{ color: "#922F6C", fontWeight: "bold" }}>
                            {error.attack}
                        </label>
                    )}
                </div>

                <div className="campo">
                    <label htmlFor="defense">Defense: </label>
                    <input
                        className="input-form"
                        value={data.defense}
                        onChange={handleChange}
                        type="text"
                        name="defense"
                        id="defense"
                        onAbort={handleInputBlur}
                    />
                    {error.defense && (
                        <label style={{ color: "#922F6C", fontWeight: "bold" }}>
                            {error.defense}
                        </label>
                    )}
                </div>

                <div className="campo">
                    <label htmlFor="speed">Speed: </label>
                    <input
                        className="input-form"
                        value={data.speed}
                        onChange={handleChange}
                        type="text"
                        name="speed"
                        id="speed"
                        onBlur={handleInputBlur}
                    />
                    {error.speed && (
                        <label style={{ color: "#922F6C", fontWeight: "bold" }}>
                            {error.speed}
                        </label>
                    )}
                </div>

                <div className="campo">
                    <label htmlFor="height">Height: </label>
                    <input
                        className="input-form"
                        value={data.height}
                        onChange={handleChange}
                        type="text"
                        name="height"
                        id="height"
                        onBlur={handleInputBlur}
                    />
                    {error.height && (
                        <label style={{ color: "#922F6C", fontWeight: "bold" }}>
                            {error.height}
                        </label>
                    )}
                </div>

                <div className="campo">
                    <label htmlFor="weight">Weight: </label>
                    <input
                        className="input-form"
                        value={data.weight}
                        onChange={handleChange}
                        type="text"
                        name="weight"
                        id="weight"
                        onBlur={handleInputBlur}
                    />
                    {error.weight && (
                        <label style={{ color: "#922F6C", fontWeight: "bold" }}>
                            {error.weight}
                        </label>
                    )}
                </div>

                <div className="campo">
                    <div className="form-types">
                        {types?.map((type) => (
                            <label htmlFor="types">
                                <input
                                    type="checkbox"
                                    name={"types"}
                                    onChange={handleChange}
                                    value={type?.id}
                                    key={type?.id}
                                />
                                {type?.name}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="campo">
                    <div className="separate-buttons">
                        <button onClick={handleCreate} type="submit">
                            Create pokemon
                        </button>
                        <Link to="/home">
                            <button>Home</button>
                        </Link>
                    </div>
                    {create && (
                        <label style={{ color: "green", fontWeight: "bold" }}>
                            Pokemon creado con exito
                        </label>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FormPage;
