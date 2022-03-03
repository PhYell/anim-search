import "./App.css";
import Card from "./components/card/card.component";

import React from "react";

let baseAPI = "https://kitsu.io/api/edge/anime?filter[text]=b";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            titles: [],
        };
    }

    componentDidMount() {
        fetch(baseAPI)
            .then((response) => response.json())
            .then((data) => this.setState({ titles: data["data"] }));
    }

    render() {
        return (
            <div className="App">
                {this.state.titles.map((title) => (
                    <Card
                        key={title.id}
                        title={title.attributes.canonicalTitle}
                    />
                ))}
            </div>
        );
    }
}

export default App;
