import "./genre-list.style.css";

import Genre from "../genre/genre.component";

const GenreList = (props) => {
    return (
        <div className="genre-list">
            {props.genres.map((genre) => (
                <Genre
                    key={genre.id}
                    genre={genre.attributes.title}
                    turned={true}
                />
            ))}
        </div>
    );
};

export default GenreList;
