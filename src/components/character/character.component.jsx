import { useEffect, useState } from "react";

import "./character.style.css";

const Character = ({ id, role }) => {
    const [character, setCharacter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const url = `https://kitsu.io/api/edge/media-characters/${id}/character`;

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => setCharacter(data["data"]["attributes"]))
            .catch((err) => {
                setError(err.message);
                setCharacter(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    // console.log(character.image);
    return (
        <div
            className="character"
            onMouseEnter={() => {
                console.log("mouse entered", id);
            }}
            onMouseLeave={() => {
                console.log("mouse left :(");
            }}
        >
            <p className="character-name">{character.canonicalName}</p>
            {character.image && (
                <div
                    className="character-image"
                    style={{
                        backgroundImage: `url(${character.image.original})`,
                    }}
                />
            )}
        </div>
    );
};

export default Character;
