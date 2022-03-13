import { NavLink } from "react-router-dom";

import "./nav.style.css";

const Nav = () => {
    return (
        <nav>
            <NavLink className="nav-link" to={{ pathname: "anim-search/" }}>
                Home
            </NavLink>
            <NavLink
                className="nav-link"
                to={{ pathname: "anim-search/search/0" }}
            >
                Search
            </NavLink>
            <NavLink
                className="nav-link"
                to={{ pathname: "anim-search/about" }}
            >
                About
            </NavLink>
        </nav>
    );
};

export default Nav;
