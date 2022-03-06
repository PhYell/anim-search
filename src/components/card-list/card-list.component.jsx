import "./card-list.style.css";

import Card from "../card/card.component";

const CardList = ({ titles }) => {
    // console.log(titles);
    return (
        <div className="card-list">
            {titles.map((title) => (
                <Card
                    key={title.id}
                    title={title.attributes.canonicalTitle}
                    synopsis={title.attributes.synopsis}
                    rating={title.attributes.averageRating}
                    image={title.attributes.posterImage.small}
                />
            ))}
        </div>
    );
};

export default CardList;
