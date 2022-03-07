import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import CardList from "../../components/card-list/card-list.component";
import CharacterList from "../../components/character-list/character-list.component";

const DescriptionPage = () => {
    const [title, setTitle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { type, id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(`https://kitsu.io/api/edge/${type}/${id}`)
            .then((response) => response.json())
            .then((data) => setTitle(data["data"]))
            .catch((err) => {
                setError(err.message);
                setTitle(null);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <main className="description-page">
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {title && <CardList titles={[title]} />}
            <CharacterList type={type} id={id} />
        </main>
    );
};

export default DescriptionPage;