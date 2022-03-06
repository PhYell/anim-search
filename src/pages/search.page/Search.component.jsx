import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SearchBox from "../../components/search-box/search-box.component";
import CardList from "../../components/card-list/card-list.component";
import Switch from "../../components/switch/switch.component";
import PageNav from "../../components/page-nav/page-nav.component";

const SearchPage = () => {
    const [titles, setTitles] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [type, setType] = useState("anime");
    const [searchValue, setSearchValue] = useState("");
    const [category, setCategory] = useState("");
    const [sortBy, setSortBy] = useState("");

    let { page } = useParams();

    let search = `filter[text]=${searchValue}&sort=${sortBy}`;

    // useEffect(() => {
    //     const getTitles = async () => {
    //         const titlesFromServer = await fetchData();
    //         setTitles(titlesFromServer);
    //     };

    //     getTitles();
    // }, [type, searchValue, sortBy, page]);

    // // fetch tasks
    // const fetchData = async () => {
    //     if (searchValue === "") search = `sort=popularityRank`; // -averageRating
    //     const response = await fetch(
    //         `https://kitsu.io/api/edge/${type}?page[limit]=10&page[offset]=${
    //             page * 10
    //         }&${search}`
    //     );
    //     const data = await response.json();

    //     return data["data"];
    // };

    useEffect(() => {
        if (searchValue === "") search = `sort=popularityRank`; // -averageRating
        fetch(
            `https://kitsu.io/api/edge/${type}?page[limit]=10&page[offset]=${
                page * 10
            }&${search}&fields[anime]=id,synopsis,canonicalTitle,posterImage,averageRating,genres`
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
    }, [type, searchValue, sortBy, page]);

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

    // console.log(titles);
    return (
        <div>
            <SearchBox onSearchChange={onSearchChange} />
            <Switch changeType={changeType} />
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
