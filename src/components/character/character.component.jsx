import { useEffect, useState } from "react";

import "./character.style.css";

import CharacterDescription from "../character-description/character-description.component";

const Character = ({ id, role }) => {
    const [character, setCharacter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isShown, setIsShown] = useState(false);

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
                setIsShown(true);
                // <CharacterDescription description={character.description} />;
            }}
            onMouseLeave={() => {
                setIsShown(false);
                // console.log("mouse left :(");
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
            {isShown && (
                <CharacterDescription description={character.description} />
            )}
        </div>
    );
};

export default Character;
