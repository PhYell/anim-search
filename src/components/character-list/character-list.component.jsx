import { useState, useEffect } from "react";

import Character from "../character/character.component";

const CharacterList = ({ type, id }) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const charactersArray = [];

    const url = `https://kitsu.io/api/edge/${type}/${id}/characters`;

    const url2 = `https://kitsu.io/api/edge/media-characters/7509/media"`;

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
    }, [type, id]);

    console.log(
        "characters",
        typeof characters,
        characters
        // characters[1]["id"]
    );

    // {
    //     Object.keys(characters).map((character) => {
    //         console.log(character);
    //     });
    // }

    // characters.map((char) => {
    //     console.log(char);
    // });

    // for (let i in characters) {
    //     charactersArray.push(characters[i]);
    // }

    // console.log(charactersArray, typeof charactersArray);

    return (
        <div>
            <h3>character list</h3>
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {/* {characters &&
                characters.map((character) => {
                    <Character key={character.id} id={character.id} />;
                })} */}
            {characters.map((character) => (
                <Character key={character.id} id={character.id} />
            ))}
            {/* {characters.map((character) => (
                <Genre key={genre.id} genre={genre.attributes.name} />
            ))} */}
            {/* {characters.map((character) => {
                <Character character={character} />;
            })} */}
            {/* <Character character={characters[1]} /> */}
        </div>
    );
};

export default CharacterList;
