import { useState, useEffect } from "react";

import "./select-genres.style.css";

import categories from "../../categories";
import Genre from "../genre/genre.component";

const SelectGenres = ({ onSelect }) => {
    // const [selectedGenres, setSelectedGenres] = useState([]);

    // const onSelect = (event) => {
    //     // setSelectedGenres(event.target.parentNode.textContent);
    //     setSelectedGenres([
    //         ...selectedGenres,
    //         event.target.parentNode.textContent,
    //     ]);
    // };

    // useEffect(() => {
    //     console.log(selectedGenres);
    // }, [selectedGenres]);

    return (
        <form className="select-genres">
            {categories.map((category) => (
                <Genre
                    key={category}
                    genre={category}
                    turned={false}
                    onSelect={onSelect}
                />
            ))}
        </form>
    );
};

export default SelectGenres;
