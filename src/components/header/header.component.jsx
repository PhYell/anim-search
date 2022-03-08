import "./header.style.css";

import Nav from "../nav/nav.component";

const Header = () => {
    return (
        <div className="header">
            <h1 className="app-name">
                Ani<span>List</span>
            </h1>
            <Nav />
        </div>
    );
};

export default Header;
