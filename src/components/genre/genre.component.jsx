import "./genre.style.css";

const Genre = ({ genre, turned, onSelect }) => {
    return (
        <label style={{ backgroundColor: {} }}>
            <input
                type="checkbox"
                onChange={onSelect}
                className="genre-checkbox"
            />
            <span className={turned ? "unselectable-genre" : "select-genre"}>
                {genre}
            </span>
        </label>
    );
};

export default Genre;

// import "./genre.style.css";

// const Genre = (props) => {
//     return (
//         <a style={{ backgroundColor: {} }} className="genre">
//             {props.genre}
//         </a>
//     );
// };

// export default Genre;
