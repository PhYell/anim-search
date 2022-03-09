import { useState, useEffect } from "react";

import "./select-genres.style.css";

import categories from "../../categories";
import Genre from "../genre/genre.component";

const SelectGenres = ({ onSelect }) => {
    // const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        fetch(
            `https://kitsu.io/api/edge/categories?page[limit]=100/include=attributes.name,id` // also make this with categories
        )
            .then((response) => response.json())
            .then((data) => setGenres(data["data"]))
            .catch((err) => {
                setError(err.message);
                setGenres(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // console.log(genres);

    return (
        <div className="select-genres-container">
            <button
                className="show-genres-button"
                onClick={() => {
                    setIsHidden(!isHidden);
                }}
            >
                {isHidden ? "hide genres" : "show genres"}
            </button>
            <form
                className="select-genres"
                style={{ display: isHidden ? "flex" : "none" }}
            >
                {genres &&
                    genres.map((genre) => (
                        <Genre
                            key={genre.id}
                            genre={genre.attributes.title}
                            count={genre.attributes.totalMediaCount}
                            turned={false}
                            onSelect={onSelect}
                        />
                    ))}
            </form>
        </div>
    );
};

export default SelectGenres;
