import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./App.css";

// import CardList from "./components/card-list/card-list.component";
// import SearchBox from "./components/search-box/search-box.component";
// import Switch from "./components/switch/switch.component";

import Nav from "./components/nav/nav.component";
import SearchPage from "./pages/search.page/Search.component";
import DescriptionPage from "./pages/description.page/description.component";
import HomePage from "./pages/home.page/home.component";

import React from "react";

const App = () => {
    return (
        <div>
            <h1 className="app-name">
                Ani<span>List</span>
            </h1>
            <Nav />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route
                    path="/description/:type/:id"
                    element={<DescriptionPage />}
                />
                <Route path="/about" element={<SearchPage />} />
                {/* <Route path="*" element={<ErrorPage />} /> */}
            </Routes>
        </div>
    );
};

export default App;
