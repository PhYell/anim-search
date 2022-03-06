import { useState, useEffect } from "react";

import SearchBox from "../../components/search-box/search-box.component";
import CardList from "../../components/card-list/card-list.component";
import Switch from "../../components/switch/switch.component";

const SearchPage = () => {
    // let type = "anime";
    // let searchValue = "";
    // let category = "";
    // let sortBy = "";

    const [titles, setTitles] = useState([]);

    const [type, setType] = useState("anime");
    const [searchValue, setSearchValue] = useState("");
    const [category, setCategory] = useState("");
    const [sortBy, setSortBy] = useState("");

    let search = `filter[text]=${searchValue}&sort=${sortBy}`;

    useEffect(() => {
        const getTitles = async () => {
            const titlesFromServer = await fetchData();
            setTitles(titlesFromServer);
        };

        getTitles();
    }, [type, searchValue, sortBy]);

    // fetch tasks
    const fetchData = async () => {
        if (searchValue === "") search = `sort=popularityRank`; // -averageRating
        const response = await fetch(
            `https://kitsu.io/api/edge/${type}?page[limit]=20&page[offset]=${0}&${search}`
        );
        const data = await response.json();

        return data["data"];
    };

    const onSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const changeType = (event) => {
        if (event.target.checked) setType("manga");
        else setType("anime");
    };

    const onSelect = (event) => {
        setSortBy(event.target.options[event.target.selectedIndex].value);
    };

    console.log(titles);
    return (
        <div>
            <SearchBox onSearchChange={onSearchChange} />
            <Switch changeType={changeType} />
            <CardList titles={titles} />
        </div>
    );
};

export default SearchPage;
