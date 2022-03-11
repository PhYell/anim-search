import { Link } from "react-router-dom";

import "./preview-item.style.css";

const PreviewItem = ({ image, name, type, id }) => {
    return (
        <div className="preview-item">
            {/* <h3>{name}</h3> */}
            <Link to={`/ani-list/description/${type}/${id}`}>
                <div
                    style={{ backgroundImage: `url(${image})` }}
                    className="preview-item-image"
                >
                    <h3 className="preview-item-title">{name}</h3>
                </div>
            </Link>
        </div>
    );
};

export default PreviewItem;
