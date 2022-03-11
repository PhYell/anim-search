import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./card.style.css";

import GenreList from "../genre-list/genre-list.component";

const Card = (props) => {
    const [genres, setGenres] = useState();
    const [loading, setLoading] = useState(true);

    const url = `https://kitsu.io/api/edge/${props.type}/${props.id}/categories`;

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => setGenres(data["data"]))
            .catch((err) => {
                setGenres(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="card">
            <Link to={`/ani-list/description/${props.type}/${props.id}`}>
                <h2 className="title">{props.title}</h2>
            </Link>
            <Link to={`/ani-list/description/${props.type}/${props.id}`}>
                <img src={props.image} alt="anime cover" />
            </Link>

            <p className="rating">
                {Math.round(props.rating) / 10 === 0
                    ? "NA"
                    : Math.round(props.rating) / 10}{" "}
                / 10
            </p>
            {genres && <GenreList genres={genres} />}
            <p className="description">{props.synopsis}</p>
        </div>
    );
};

export default Card;
