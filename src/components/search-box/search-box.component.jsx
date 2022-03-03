import "./search-box.style.css";

function SearchBox(props) {
    return (
        <input
            className="search-input"
            type="search"
            placeholder="search"
            onChange={props.onSearchChange}
        ></input>
    );
}

export default SearchBox;
