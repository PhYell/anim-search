import "./preview-list.style.css";

import PreviewItem from "../preview-item/preview-item.component";

const PreviewList = ({ titles, season, year }) => {
    return (
        <div className="preview-list">
            <h2 className="preview-list-title">
                <div className={`line ${season}`}></div>
                <span className={season}>{season}</span>{" "}
                <p className="season-text">season </p>
                <span className={season}>{year}</span>
                <div className={`line ${season}`}></div>
            </h2>
            <div className="preview-list-items">
                {titles.map((title) => (
                    <PreviewItem
                        key={title.id}
                        id={title.id}
                        type={title.type}
                        name={title.titles.rj}
                        image={title.cover_image}
                    />
                ))}
                <div className={`line ${season} divider-line`}></div>
            </div>
        </div>
    );
};

export default PreviewList;
