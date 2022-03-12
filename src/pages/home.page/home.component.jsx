import { useState, useEffect } from "react";

import PreviewList from "../../components/preview-list/preview-list.component";

const date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const previousDate = new Date();
previousDate.setMonth(previousDate.getMonth() - 3);

let prevYear = previousDate.getFullYear();
let prevMonth = previousDate.getMonth();

const seasons = ["winter", "spring", "summer", "fall"];

function giveSeason(month) {
    switch (month) {
        case 11:
        case 0:
        case 1:
            return 0;
        case 2:
        case 3:
        case 4:
            return 1;
        case 5:
        case 6:
        case 7:
            return 2;
        case 8:
        case 9:
        case 10:
            return 3;
    }
}

const HomePage = () => {
    const [titles, setTitles] = useState([]);
    const [titlesFromPreviousSeason, setTitlesFromPreviousSeason] = useState(
        []
    );

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // useEffect(() => {
    //     fetch(
    //         `https://kitsu.io/api/edge/anime?page[limit]=20&
    //         page[offset]=0&filter[season]=${giveSeason(
    //             month
    //         )}&filter[seasonYear]=${year}&sort=popularityRank`
    //     )
    //         .then((response) => response.json())
    //         .then((data) => setTitles(data["data"]))
    //         .catch((err) => {
    //             setError(err.message);
    //             setTitles(null);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });

    //     fetch(
    //         `https://kitsu.io/api/edge/anime?page[limit]=8&
    //             page[offset]=0&filter[season]=${giveSeason(
    //                 prevMonth
    //             )}&filter[seasonYear]=${prevYear}&sort=popularityRank`
    //     )
    //         .then((response) => response.json())
    //         .then((data) => setTitlesFromPreviousSeason(data["data"]))
    //         .catch((err) => {
    //             setError(err.message);
    //             setTitlesFromPreviousSeason(null);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // }, []);

    //weekly_airing_day

    useEffect(() => {
        fetch(
            `https://api.aniapi.com/v1/anime?season=${giveSeason(
                month
            )}&year=${year}`,
            {
                //status=1 for ongoings
                method: "GET",
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzODYiLCJuYmYiOjE2NDcwMjM5MzcsImV4cCI6MTY0OTYxNTkzNywiaWF0IjoxNjQ3MDIzOTM3fQ.ASKDWEhjwrxamRTT4MwHO0Dadr20lfn48QJuMg5p548",
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        )
            .then((response) => response.json())
            .then((data) => setTitles(data.data.documents))
            .catch((err) => {
                setError(err.message);
                setTitles(null);
            })
            .finally(() => {
                setLoading(false);
            });

        fetch(
            `https://api.aniapi.com/v1/anime?season=${giveSeason(
                prevMonth
            )}&year=${prevYear}`,
            {
                method: "GET",
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzODYiLCJuYmYiOjE2NDcwMjM5MzcsImV4cCI6MTY0OTYxNTkzNywiaWF0IjoxNjQ3MDIzOTM3fQ.ASKDWEhjwrxamRTT4MwHO0Dadr20lfn48QJuMg5p548",
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        )
            .then((response) => response.json())
            .then((data) => setTitlesFromPreviousSeason(data.data.documents))
            .catch((err) => {
                setError(err.message);
                setTitlesFromPreviousSeason(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    console.log(titles);
    return (
        <div className="home-page">
            <PreviewList
                titles={titles}
                season={seasons[giveSeason(month)]}
                year={year}
            />
            <PreviewList
                titles={titlesFromPreviousSeason}
                season={seasons[giveSeason(prevMonth)]}
                year={year}
            />
        </div>
    );
};

export default HomePage;
