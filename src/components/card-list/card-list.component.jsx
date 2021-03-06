import "./card-list.style.css";

import Card from "../card/card.component";

const CardList = ({ titles }) => {
    return (
        <div className="card-list">
            {titles.map((title) => (
                <Card
                    key={title.id}
                    id={title.id}
                    type={title.type}
                    title={title.titles.rj}
                    synopsis={title.descriptions.en}
                    rating={title.score}
                    image={title.cover_image}
                    preferedColor={title.cover_color}
                    genres={title.genres}
                />
            ))}
            {/* {titles.map((title) => (
                <Card
                    key={title.id}
                    id={title.id}
                    type={title.type}
                    title={title.attributes.canonicalTitle}
                    synopsis={title.attributes.synopsis}
                    rating={title.attributes.averageRating}
                    image={title.attributes.posterImage.small}
                />
            ))} */}
        </div>
    );
};

export default CardList;
