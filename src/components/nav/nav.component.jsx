import { Link } from "react-router-dom";

import "./nav.style.css";

const Nav = () => {
    return (
        <nav>
            <Link className="link" to={{ pathname: "/ani-list/" }}>
                Home
            </Link>
            <Link className="link" to={{ pathname: "/ani-list/search/0" }}>
                Search
            </Link>
            <Link className="link" to={{ pathname: "/ani-list/about" }}>
                About
            </Link>
        </nav>
    );
};

export default Nav;
