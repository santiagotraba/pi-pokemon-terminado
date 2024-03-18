import { useEffect, useState } from "react";
import SearchBar from "./Searchbar";
import { getPokemons } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import Cardcontainer from "./Cardcontainer";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import loader from "../assets/loader.gif";
import "./Homepage.css";

const HomePage = () => {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const filterPokemons = useSelector((state) => state?.pokemonsFilter);

    const [actuallyPage, setActuallyPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);

    const firstIndex = (actuallyPage - 1) * pokemonsPerPage;
    const lastIndex = actuallyPage * pokemonsPerPage;
    const pokemonSlice = filterPokemons?.slice(firstIndex, lastIndex);

    const changePage = (page) => {
        setActuallyPage(page);
    };

    const decrementPage = () => {
        if (actuallyPage > 1) {
            setActuallyPage((prevPage) => prevPage - 1);
        }
    };

    const incrementPage = () => {
        setActuallyPage((prevPage) => prevPage + 1);
    };

    //useEffect: cuando se monte el componente hace lo que digo
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getPokemons());
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    if (loading) {
        return (
            <div className="contain-loader">
                <img src={loader} alt="" width={500}></img>
            </div>
        );
    }

    return (
        <div>
            <div className="container-xl">
                <Navbar />
            </div>
            <div className="pokemons-section">
                <div className="container-xl">
                    <Cardcontainer pokemons={pokemonSlice} />
                </div>
            </div>

            <Pagination
                changePage={changePage}
                pokemonsPerPage={pokemonsPerPage}
                filterPokemons={filterPokemons?.length}
                decrementPage={decrementPage}
                incrementPage={incrementPage}
            />
            <Link to={"/form"}>
                <button className="botonlanding">Crear pokemon</button>
            </Link>
        </div>
    );
};

export default HomePage;

//loading/basic spinner react
