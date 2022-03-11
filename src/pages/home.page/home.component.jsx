import { useState, useEffect } from "react";

import PreviewList from "../../components/preview-list/preview-list.component";

const date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let season = "";
switch (month) {
    case 11:
    case 0:
    case 1:
        season = "winter";
        break;
    case 2:
    case 3:
    case 4:
        season = "spring";
        break;
    case 5:
    case 6:
    case 7:
        season = "summer";
        break;
    case 8:
    case 9:
    case 10:
        season = "fall";
        break;
}

const HomePage = () => {
    const [titles, setTitles] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(
            `https://kitsu.io/api/edge/anime?page[limit]=9&
            page[offset]=0&filter[season]=${season}&filter[seasonYear]=${year}&sort=popularityRank`
        )
            .then((response) => response.json())
            .then((data) => setTitles(data["data"]))
            .catch((err) => {
                setError(err.message);
                setTitles(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return <PreviewList titles={titles} season={season} year={year} />;
};

export default HomePage;
