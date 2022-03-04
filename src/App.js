import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import Switch from "./components/switch/switch.component";

import React from "react";

let type = "anime";
let searchValue = "";
let category = "";
let sortBy = "";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            titles: [],
            titles2: [],
        };
    }

    fillStateTitles() {
        let search = `filter[text]=${searchValue}&sort=${sortBy}`;
        if (searchValue == "") search = `sort=popularityRank`; // -averageRating

        // fetch(
        //     `https://kitsu.io/api/edge/${type}?page[limit]=20&page[offset]=${0}&${search}`
        // )
        //     .then((response) => response.json())
        //     .then((data) => this.setState({ titles: data["data"] }));
        // fetch(
        //     `https://kitsu.io/api/edge/${type}?page[limit]=20&page[offset]=${20}&${search}`
        // )
        //     .then((response) => response.json())
        //     .then((data) => this.setState({ titles2: data["data"] }));

        Promise.all([
            fetch(
                `https://kitsu.io/api/edge/${type}?page[limit]=20&page[offset]=${0}&${search}`
            ).then((resp) => resp.json()),
            fetch(
                `https://kitsu.io/api/edge/${type}?page[limit]=20&page[offset]=${20}&${search}`
            ).then((resp) => resp.json()),
            fetch(
                `https://kitsu.io/api/edge/${type}?page[limit]=20&page[offset]=${40}&${search}`
            ).then((resp) => resp.json()),
        ]).then((data) =>
            this.setState({
                titles: data[0]["data"]
                    .concat(data[1]["data"])
                    .concat(data[2]["data"]),
            })
        );
    }

    componentDidMount() {
        this.fillStateTitles();
    }

    onSearchChange = (event) => {
        console.log(event.target.value);
        searchValue = event.target.value;

        this.fillStateTitles();
    };

    changeType = (event) => {
        if (event.target.checked) type = "manga";
        else type = "anime";

        this.fillStateTitles();
    };

    onSelect = (event) => {
        sortBy = event.target.options[event.target.selectedIndex].value;

        this.fillStateTitles();
    };

    render() {
        // console.log(this.state.titles);
        return (
            <div className="App">
                <h1 className="app-name">
                    Ani<span>List</span>
                </h1>
                <SearchBox onSearchChange={this.onSearchChange} />
                <Switch changeType={this.changeType} />
                <CardList titles={this.state.titles} />
            </div>
        );
    }
}

export default App;
