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

    // let search = `filter[text]=${searchValue}&sort=${sortBy}`;
    // if (searchValue == "") search = `sort=popularityRank`; // -averageRating

    // const fillStateTitles = () => {
    //     let search = `filter[text]=${searchValue}&sort=${sortBy}`;
    //     if (searchValue == "") search = `sort=popularityRank`; // -averageRating
    //     Promise.all([
    //         fetch(
    //             `https://kitsu.io/api/edge/${type}?page[limit]=20&page[offset]=${0}&${search}`
    //         ).then((resp) => resp.json()),
    //         fetch(
    //             `https://kitsu.io/api/edge/${type}?page[limit]=20&page[offset]=${20}&${search}`
    //         ).then((resp) => resp.json()),
    //     ]).then((data) =>
    //         setTitles({
    //             titles: data[0]["data"].concat(data[1]["data"]),
    //         })
    //     );
    // };

    // const fetchData = () => {
    //     let search = `filter[text]=${searchValue}&sort=${sortBy}`;
    //     if (searchValue == "") search = `sort=popularityRank`; // -averageRating

    //     fetch(
    //         `https://kitsu.io/api/edge/${type}?page[limit]=20&page[offset]=${0}&${search}`
    //     )
    //         .then((response) => response.json())
    //         .then((data) =>
    //             setTitles({
    //                 titles: data["data"],
    //             })
    //         );
    // };

    useEffect(() => {
        console.log("chnage");
        if (searchValue === "") search = `sort=popularityRank`; // -averageRating

        const getTitles = async () => {
            const titlesFromServer = await fetchData();
            setTitles(titlesFromServer);
        };

        getTitles();
    }, [type, searchValue, sortBy]);

    // fetch tasks
    const fetchData = async () => {
        // let search = `filter[text]=${searchValue}&sort=${sortBy}`;
        // if (searchValue === "") search = `sort=popularityRank`; // -averageRating

        const response = await fetch(
            `https://kitsu.io/api/edge/${type}?page[limit]=20&page[offset]=${0}&${search}`
        );
        const data = await response.json();

        return data["data"];
    };

    // componentDidMount() {
    //     this.fillStateTitles();
    // }

    const onSearchChange = (event) => {
        console.log(event.target.value);
        setSearchValue(event.target.value);

        // console.log(titles);

        // const getTitles = async () => {
        //     const titlesFromServer = await fetchData();
        //     setTitles(titlesFromServer);
        // };

        // getTitles();
    };

    const changeType = (event) => {
        if (event.target.checked) setType("manga");
        else setType("anime");

        console.log("changed type");

        // const getTitles = async () => {
        //     const titlesFromServer = await fetchData();
        //     setTitles(titlesFromServer);
        // };

        // getTitles();
    };

    const onSelect = (event) => {
        setSortBy(event.target.options[event.target.selectedIndex].value);

        // const getTitles = async () => {
        //     const titlesFromServer = await fetchData();
        //     setTitles(titlesFromServer);
        // };

        // getTitles();
    };

    return (
        <div>
            <SearchBox onSearchChange={onSearchChange} />
            <Switch changeType={changeType} />
            <CardList titles={titles} />
        </div>
    );
};

export default SearchPage;
