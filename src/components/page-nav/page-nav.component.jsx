import { Link, useParams, useNavigate } from "react-router-dom";

import "./page-nav.style.css";

const PageNav = () => {
    let { page } = useParams();

    const navigate = useNavigate();
    return (
        <div className="page-nav">
            {page > 0 ? (
                <button
                    onClick={() =>
                        navigate(`../ani-list/search/${parseInt(page) - 1}`, {
                            replace: true,
                        })
                    }
                >
                    {"<"}
                </button>
            ) : (
                <p className="disabled-page-nav">{"<"}</p>
            )}
            <p className="current-page">{page}</p>

            <button
                onClick={() =>
                    navigate(`../ani-list/search/${parseInt(page) + 1}`, {
                        replace: true,
                    })
                }
            >
                {">"}
            </button>
        </div>
    );
};

export default PageNav;
