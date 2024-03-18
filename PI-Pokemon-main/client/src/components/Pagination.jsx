import React from "react";
import "./Pagination.css";
import arrowLeft from "../assets/arrow-left.svg";
import arrowRight from "../assets/arrow-right.svg";

const Pagination = ({
    changePage,
    pokemonsPerPage,
    filterPokemons,
    decrementPage,
    incrementPage,
}) => {
    const divisionTotal = [];

    for (
        let index = 1;
        index <= Math.ceil(filterPokemons / pokemonsPerPage);
        index++
    ) {
        divisionTotal?.push(index);
    }

    return (
        <div className="container-pagination">
            <button
                className="button-pagination"
                onClick={() => decrementPage()}
            >
                <img src={arrowLeft} alt="" width={"40px"} />
            </button>
            {divisionTotal?.map((page) => (
                <button
                    className="button-pagination"
                    key={page}
                    onClick={() => changePage(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className="button-pagination"
                onClick={() => incrementPage()}
            >
                <img src={arrowRight} alt="" width={"40px"} />
            </button>
        </div>
    );
};

export default Pagination;
