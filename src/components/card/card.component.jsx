import "./card.style.css";

function Card(props) {
    return (
        <div className="card">
            <h1 className="title">{props.title}</h1>
            <img src={props.image} alt="anime cover image" />
            <p className="rating">{Math.round(props.rating) / 10} / 10</p>
            <p className="description">{props.synopsis}</p>
        </div>
    );
}

export default Card;
