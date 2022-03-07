import { useState, useEffect } from "react";

import "./character-list.style.css";

import Character from "../character/character.component";

const CharacterList = ({ type, id }) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const charactersArray = [];

    const url = `https://kitsu.io/api/edge/${type}/${id}/characters?page[limit]=20&page[offset]=0`;
    //https://kitsu.io/api/edge/anime/7442/characters?filter[role]=main

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => setCharacters(data["data"]))
            .catch((err) => {
                setError(err.message);
                setCharacters(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); //type, id

    return (
        <div className="character-list">
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {characters &&
                characters.map((character) => (
                    <Character
                        key={character.id}
                        id={character.id}
                        role={character.attributes.role}
                    />
                ))}
        </div>
    );
};

export default CharacterList;
