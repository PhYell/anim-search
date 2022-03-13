import { NavLink } from "react-router-dom";

import "./nav.style.css";

const Nav = () => {
    return (
        <nav>
            <NavLink className="nav-link" to={{ pathname: "./" }}>
                Home
            </NavLink>
            <NavLink className="nav-link" to={{ pathname: "./search/0" }}>
                Search
            </NavLink>
            <NavLink className="nav-link" to={{ pathname: "./about" }}>
                About
            </NavLink>
        </nav>
    );
};

export default Nav;
