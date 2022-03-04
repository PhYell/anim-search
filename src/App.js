import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import Switch from "./components/switch/switch.component";

import React from "react";

let type = "anime";
let searchValue = "";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            titles: [],
            searchField: "",
        };
    }

    componentDidMount() {
        fetch(
            `https://kitsu.io/api/edge/${type}?page[limit]=20&page[offset]=0&filter[text]=` +
                searchValue
        )
            .then((response) => response.json())
            .then((data) => this.setState({ titles: data["data"] }));
    }

    onSearchChange = (event) => {
        console.log(event.target.value);
        searchValue = event.target.value;

        fetch(
            `https://kitsu.io/api/edge/${type}?page[limit]=20&page[offset]=0&filter[text]=` +
                searchValue
        )
            .then((response) => response.json())
            .then((data) => this.setState({ titles: data["data"] }));
        // this.setState({ searchField: event.target.value });
    };

    changeType = (event) => {
        if (event.target.checked) type = "manga";
        else type = "anime";

        fetch(
            `https://kitsu.io/api/edge/${type}?page[limit]=20&page[offset]=0&filter[text]=` +
                searchValue
        )
            .then((response) => response.json())
            .then((data) => this.setState({ titles: data["data"] }));
    };

    render() {
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
