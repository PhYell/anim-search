import { useState, useEffect } from "react";

import PreviewList from "../../components/preview-list/preview-list.component";

const date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const previousDate = new Date();
previousDate.setMonth(previousDate.getMonth() - 3);

let prevYear = previousDate.getFullYear();
let prevMonth = previousDate.getMonth();

function giveSeason(month) {
    switch (month) {
        case 11:
        case 0:
        case 1:
            return "winter";
        case 2:
        case 3:
        case 4:
            return "spring";
        case 5:
        case 6:
        case 7:
            return "summer";
        case 8:
        case 9:
        case 10:
            return "fall";
    }
}

const HomePage = () => {
    const [titles, setTitles] = useState([]);
    const [titlesFromPreviousSeason, setTitlesFromPreviousSeason] = useState(
        []
    );

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    console.log("previous date", previousDate);

    useEffect(() => {
        fetch(
            `https://kitsu.io/api/edge/anime?page[limit]=20&
            page[offset]=0&filter[season]=${giveSeason(
                month
            )}&filter[seasonYear]=${year}&sort=popularityRank`
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

        fetch(
            `https://kitsu.io/api/edge/anime?page[limit]=8&
                page[offset]=0&filter[season]=${giveSeason(
                    prevMonth
                )}&filter[seasonYear]=${prevYear}&sort=popularityRank`
        )
            .then((response) => response.json())
            .then((data) => setTitlesFromPreviousSeason(data["data"]))
            .catch((err) => {
                setError(err.message);
                setTitlesFromPreviousSeason(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="home-page">
            <PreviewList
                titles={titles}
                season={giveSeason(month)}
                year={year}
            />
            <PreviewList
                titles={titlesFromPreviousSeason}
                season={giveSeason(prevMonth)}
                year={year}
            />
        </div>
    );
};

export default HomePage;
