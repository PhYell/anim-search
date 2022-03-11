import "./preview-list.style.css";

import PreviewItem from "../preview-item/preview-item.component";

const PreviewList = ({ titles, season, year }) => {
    return (
        <div className="preview-list">
            <h2>
                <span className={season}>{season}</span> season{" "}
                <span className={season}>{year}</span>
            </h2>
            {titles.map((title) => (
                <PreviewItem
                    key={title.id}
                    name={title.attributes.canonicalTitle}
                    image={title.attributes.posterImage}
                />
            ))}
        </div>
    );
};

export default PreviewList;
