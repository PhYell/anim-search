import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SearchBox from "../../components/search-box/search-box.component";
import CardList from "../../components/card-list/card-list.component";
import Switch from "../../components/switch/switch.component";
import PageNav from "../../components/page-nav/page-nav.component";
import SelectGenres from "../../components/select-genres/select-genres.component";

const SearchPage = () => {
    const [titles, setTitles] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [type, setType] = useState("anime");
    const [searchValue, setSearchValue] = useState("");
    const [category, setCategory] = useState("");
    const [sortBy, setSortBy] = useState("");

    const [selectedGenres, setSelectedGenres] = useState([]);

    let { page } = useParams();

    let search = `filter[text]=${searchValue}&sort=${sortBy}`;

    // useEffect(() => {
    //     let searchCategories = "";
    //     if (selectedGenres.length > 0) {
    //         searchCategories = `filter[categories]=${selectedGenres}`;
    //     }
    //     console.log(searchCategories);

    //     if (searchValue === "") search = `sort=popularityRank`; // -averageRating
    //     fetch(
    //         `https://kitsu.io/api/edge/${type}?page[limit]=10&page[offset]=${
    //             page * 10
    //         }&${search}&fields[anime]=id,synopsis,canonicalTitle,posterImage,averageRating,genres,categories&${searchCategories}
    //         }`
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
    // }, [type, searchValue, sortBy, page, selectedGenres]);

    //create timer, so searchValue can be changed once every 2-3 seconds

    useEffect(() => {
        let searchCategories = "";
        if (selectedGenres.length > 0) {
            searchCategories = `genres=${selectedGenres}`;
        }
        console.log(searchCategories);

        let showTitle = "";
        if (searchValue != "") {
            showTitle = `title=${searchValue}`;
        }
        console.log(showTitle);

        fetch(
            `https://api.aniapi.com/v1/${type}?${showTitle}&${searchCategories}`,
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
            .then((data) => setTitles(data.data))
            .catch((err) => {
                setError(err.message);
                setTitles(null);
            })
            .finally(() => {
                setLoading(false);
            });

        // .then((response) => response.json())
        //     .then((data) => console.log(data));
    }, [type, searchValue, sortBy, page, selectedGenres]);

    const onSearchChange = (event) => {
        setSearchValue(event.target.value);
        console.log(event.target.value);
    };

    const changeType = (event) => {
        if (event.target.checked) setType("manga");
        else setType("anime");
    };

    const onSelect = (event) => {
        const ar = selectedGenres;
        console.log(event.target.parentNode.querySelector(".genre-text"));
        if (
            selectedGenres.includes(
                event.target.parentNode.querySelector(".genre-text").textContent
            )
        ) {
            const index = selectedGenres.indexOf(
                event.target.parentNode.querySelector(".genre-text").textContent
            );
            if (index > -1) {
                ar.splice(index, 1);
            }
            setSelectedGenres([...ar]);
        } else {
            setSelectedGenres([
                ...selectedGenres,
                event.target.parentNode.querySelector(".genre-text")
                    .textContent,
            ]);
        }

        // setSelectedGenres(event.target.parentNode.textContent);
        // if (selectedGenres.includes(event.target.parentNode.textContent)) {
        //     setSelectedGenres([
        //         ...selectedGenres,
        //         event.target.parentNode.textContent,
        //     ]);
        // }
        // console.log();
    };

    // console.log(titles);
    // console.log(titles);
    return (
        <div>
            <SearchBox onSearchChange={onSearchChange} />
            <Switch changeType={changeType} />
            <SelectGenres onSelect={onSelect} />
            <PageNav />
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {!loading && <CardList titles={titles.documents} />}
            {titles.length === 0 && (
                <div className="nothing-was-found-spacing"></div>
            )}
            <PageNav />
        </div>
    );
};

export default SearchPage;
