import Genre from "../genre/genre.component";

const GenreList = (props) => {
    return (
        <>
            {props.genres.map((genre) => (
                <Genre key={genre.id} genre={genre.attributes.name} />
            ))}
        </>
    );
};

export default GenreList;
