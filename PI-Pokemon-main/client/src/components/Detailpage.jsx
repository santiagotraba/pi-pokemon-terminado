import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../redux/action";
import "./Detailpage.css";

const DetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const detailPokemon = useSelector((state) => state?.detailPokemon);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getPokemonById(id));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch, id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex">
            <div className="detailcard">
                <img src={detailPokemon?.image} alt="imagen del pokemon" />
                <div className="center">
                    <h1>#{detailPokemon?.id}</h1>
                    <h1>{detailPokemon.name}</h1>
                    <div className="separation">
                        <div className="stats">
                            <div className="center" style={{ gap: 0 }}>
                                <h6>HP </h6>
                                <h2>{detailPokemon?.hp}</h2>
                            </div>
                            <div className="center" style={{ gap: 0 }}>
                                <h6>Attack </h6>
                                <h2>{detailPokemon?.attack}</h2>
                            </div>
                            <div className="center" style={{ gap: 0 }}>
                                <h6>Defense </h6>
                                <h2>{detailPokemon?.defense}</h2>
                            </div>
                        </div>
                        <div className="stats">
                            <div className="center" style={{ gap: 0 }}>
                                <h6>Speed </h6>
                                <h2>{detailPokemon?.speed}</h2>
                            </div>
                            <div className="center" style={{ gap: 0 }}>
                                <h6>Height </h6>
                                <h2>{detailPokemon?.height}</h2>
                            </div>
                            <div className="center" style={{ gap: 0 }}>
                                <h6>Weight </h6>
                                <h2>{detailPokemon?.weight}</h2>
                            </div>
                            <div>
                                <h6>Types: </h6>
                                <h2>
                                    {detailPokemon.type
                                        ? detailPokemon.type
                                        : detailPokemon.types
                                        ? detailPokemon.types
                                              .map((type) => type.name)
                                              .join(", ")
                                        : null}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/home">
                <button>Home</button>
            </Link>
        </div>
    );
};

export default DetailPage;
