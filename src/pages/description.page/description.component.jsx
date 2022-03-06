import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Card from "../../components/card/card.component";
import CardList from "../../components/card-list/card-list.component";

const DescriptionPage = () => {
    const [title, setTitle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { type, id } = useParams(); // or let

    useEffect(() => {
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
    }, [type, id]);

    return (
        <main className="description-page">
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {title && <CardList titles={[title]} />}
        </main>
    );
};

export default DescriptionPage;
