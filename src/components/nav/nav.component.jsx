import { NavLink } from "react-router-dom";

import "./nav.style.css";

const Nav = () => {
    return (
        <nav>
            <NavLink className="nav-link" to={{ pathname: "/ani-list/" }}>
                Home
            </NavLink>
            <NavLink
                className="nav-link"
                to={{ pathname: "/ani-list/search/0" }}
            >
                Search
            </NavLink>
            <NavLink className="nav-link" to={{ pathname: "/ani-list/about" }}>
                About
            </NavLink>
        </nav>
    );
};

export default Nav;
