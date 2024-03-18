import React, { useEffect, useState } from "react";
import { filterByOrigin, filterByType, getTypes } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

function Buttonfilter() {
    const [origin, setOrigin] = useState("all");
    const [type, setType] = useState("all");

    const allTypes = useSelector((state) => state?.types);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes());
    }, []);

    const filterByoriginHandler = (event) => {
        setOrigin(event.target.value);
        dispatch(filterByOrigin(event.target.value));
    };

    const filterByTypeHandler = (event) => {
        setType(event.target.value);
        dispatch(filterByType(event.target.value));
    };
    return (
        <div className="form form-select">
            <select value={origin} onChange={filterByoriginHandler}>
                <option value="all" selected>
                    All
                </option>

                <option value="database">Database</option>

                <option value="api">Api</option>
            </select>

            <select value={type} onChange={filterByTypeHandler}>
                {allTypes?.map((type) => (
                    <option key={type.id} value={type.name}>
                        {type.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Buttonfilter;
