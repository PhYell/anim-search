import { useState, useEffect } from "react";

import SearchBox from "../../components/search-box/search-box.component";
import CardList from "../../components/card-list/card-list.component";
import Switch from "../../components/switch/switch.component";

const SearchPage = () => {
    let type = "anime";
    let searchValue = "";
    let category = "";
    let sortBy = "";

    const [titles, setTitles] = useState([]);

    // const url = `https://kitsu.io/api/edge/${type}?page[limit]=20&page[offset]=0&sort=popularityRank`;

    let search = `filter[text]=${searchValue}&sort=${sortBy}`;
    if (searchValue == "") search = `sort=popularityRank`; // -averageRating

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

    const fetchData = async () => {
        let search = `filter[text]=${searchValue}&sort=${sortBy}`;
        if (searchValue == "") search = `sort=popularityRank`; // -averageRating
        try {
            const response = await fetch(
                `https://kitsu.io/api/edge/${type}?page[limit]=20&page[offset]=${0}&${search}`
            );
            const data = await response.json();
            // console.log("data : ", data["data"]);
            setTitles(data["data"]);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // componentDidMount() {
    //     this.fillStateTitles();
    // }

    const onSearchChange = (event) => {
        console.log(event.target.value);
        searchValue = event.target.value;

        fetchData();
    };

    const changeType = (event) => {
        if (event.target.checked) type = "manga";
        else type = "anime";

        fetchData();
    };

    const onSelect = (event) => {
        sortBy = event.target.options[event.target.selectedIndex].value;

        fetchData();
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
