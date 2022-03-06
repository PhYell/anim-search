import { Link } from "react-router-dom";

import "./nav.style.css";

const Nav = () => {
    return (
        <nav>
            <Link className="link" to={{ pathname: "/" }}>
                Home
            </Link>
            <Link className="link" to={{ pathname: "/search/0" }}>
                Search
            </Link>
            <Link className="link" to={{ pathname: "/about" }}>
                About
            </Link>
        </nav>
    );
};

export default Nav;
