import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import React from "react";

let baseLink = "https://kitsu.io/api/edge/anime?filter[text]=";
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
        fetch(baseLink + searchValue)
            .then((response) => response.json())
            .then((data) => this.setState({ titles: data["data"] }));
    }

    onSearchChange = (event) => {
        console.log(event.target.value);
        searchValue = event.target.value;
        fetch(baseLink + searchValue)
            .then((response) => response.json())
            .then((data) => this.setState({ titles: data["data"] }));
        // this.setState({ searchField: event.target.value });
    };

    render() {
        return (
            <div className="App">
                <SearchBox onSearchChange={this.onSearchChange} />
                <CardList titles={this.state.titles} />
            </div>
        );
    }
}

export default App;
