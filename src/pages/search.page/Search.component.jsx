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

    useEffect(() => {
        let searchCategories = "";
        if (selectedGenres.length > 0) {
            searchCategories = `filter[categories]=${selectedGenres}`;
        }
        console.log(searchCategories);

        if (searchValue === "") search = `sort=popularityRank`; // -averageRating
        fetch(
            `https://kitsu.io/api/edge/${type}?page[limit]=10&page[offset]=${
                page * 10
            }&${search}&fields[anime]=id,synopsis,canonicalTitle,posterImage,averageRating,genres,categories&${searchCategories}
            }`
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
            {titles && <CardList titles={titles} />}
            <PageNav />
        </div>
    );
};

export default SearchPage;
