import { Link } from "react-router-dom";

import "./card.style.css";

const Card = (props) => {
    return (
        <div className="card">
            <Link to={`/description/${props.type}/${props.id}`}>
                <h2 className="title">{props.title}</h2>
            </Link>
            <Link to={`/description/${props.type}/${props.id}`}>
                <img src={props.image} alt="anime cover" />
            </Link>

            <p className="rating">{Math.round(props.rating) / 10} / 10</p>
            <p className="description">{props.synopsis}</p>
        </div>
    );
};

export default Card;
