import "./card.style.css";

function Card(props) {
    return (
        <div className="card">
            <h2 className="title">{props.title}</h2>
            <img src={props.image} alt="anime cover" />
            <p className="rating">{Math.round(props.rating) / 10} / 10</p>
            <p className="description">{props.synopsis}</p>
        </div>
    );
}

export default Card;
