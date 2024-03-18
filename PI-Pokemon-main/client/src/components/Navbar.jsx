import React from "react";
import SearchBar from "./Searchbar";
import Buttonfilter from "./Buttonfilter";
import Buttonorder from "./Buttonorder";

function Navbar() {
    return (
        <div className="navbar">
            <SearchBar />
            <Buttonfilter />
            <Buttonorder />
        </div>
    );
}

export default Navbar;
