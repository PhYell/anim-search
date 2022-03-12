import { useState, useEffect } from "react";

import "./select-genres.style.css";

import categories from "../../categories";
import Genre from "../genre/genre.component";

const SelectGenres = ({ onSelect }) => {
    // const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [isHidden, setIsHidden] = useState(false);

    //https://api.aniapi.com/v1/resources/1.0/0

    // useEffect(() => {
    //     fetch(
    //         `https://kitsu.io/api/edge/categories?page[limit]=100/include=attributes.name,id` // also make this with categories
    //     )
    //         .then((response) => response.json())
    //         .then((data) => setGenres(data["data"]))
    //         .catch((err) => {
    //             setError(err.message);
    //             setGenres(null);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // }, []);

    useEffect(() => {
        fetch(`https://api.aniapi.com/v1/resources/1.0/0`, {
            method: "GET",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzODYiLCJuYmYiOjE2NDcwMjM5MzcsImV4cCI6MTY0OTYxNTkzNywiaWF0IjoxNjQ3MDIzOTM3fQ.ASKDWEhjwrxamRTT4MwHO0Dadr20lfn48QJuMg5p548",
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setGenres(data.data.genres))
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
                            key={genre}
                            genre={genre}
                            count={9}
                            turned={false}
                            onSelect={onSelect}
                        />
                    ))}
            </form>
        </div>
    );
};

export default SelectGenres;
