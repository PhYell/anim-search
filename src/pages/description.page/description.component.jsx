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
        fetch(`https://api.aniapi.com/v1/anime/${id}`, {
            method: "GET",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzODYiLCJuYmYiOjE2NDcwMjM5MzcsImV4cCI6MTY0OTYxNTkzNywiaWF0IjoxNjQ3MDIzOTM3fQ.ASKDWEhjwrxamRTT4MwHO0Dadr20lfn48QJuMg5p548",
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setTitle(data.data))
            .catch((err) => {
                setError(err.message);
                setTitle(null);
            })
            .finally(() => {
                setLoading(false);
                console.log(title);
            });
    }, []);

    // const fetchData = () => {
    //     fetch(`https://kitsu.io/api/edge/${type}/${id}`)
    //         .then((response) => response.json())
    //         .then((data) => setTitle(data["data"]))
    //         .catch((err) => {
    //             setError(err.message);
    //             setTitle(null);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // };

    return (
        <main className="description-page">
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {title && <CardList titles={[title]} />}
            {/* <CharacterList type={type} id={id} /> */}
        </main>
    );
};

export default DescriptionPage;
