import "./genre-list.style.css";

import Genre from "../genre/genre.component";

const GenreList = ({ genres }) => {
    return (
        <div className="genre-list">
            {genres.map((genre) => (
                <Genre key={genre} genre={genre} turned={true} />
            ))}
        </div>
    );
};

export default GenreList;
