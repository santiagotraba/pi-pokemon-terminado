//rfce
import React from "react";
import Card from "./Card";
import "./Cardcontainer.css";

function Cardcontainer({ pokemons }) {
    return (
        <div className="card-container">
            {pokemons?.map(
                ({
                    id,
                    name,
                    sprites,
                    stats,
                    height,
                    weight,
                    types,
                    image,
                    hp,
                    attack,
                    defense,
                    speed,
                }) => (
                    <div className="card-item">
                        {typeof id == "number" ? (
                            <Card
                                id={id}
                                key={id}
                                name={name}
                                image={sprites?.front_default}
                                hp={stats[0].base_stat}
                                attack={stats[1].base_stat}
                                defense={stats[2].base_stat}
                                speed={stats[5].base_stat}
                                height={height}
                                weight={weight}
                                types={types?.map((type) => type?.type?.name)}
                            />
                        ) : (
                            <Card
                                id={id}
                                key={id}
                                name={name}
                                image={image}
                                hp={hp}
                                attack={attack}
                                defense={defense}
                                speed={speed}
                                height={height}
                                weight={weight}
                                types={types?.map((type) => type?.name)}
                            />
                        )}
                    </div>
                )
            )}
        </div>
    );
}

export default Cardcontainer;
