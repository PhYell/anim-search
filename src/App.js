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
import Header from "./components/header/header.component";

import React from "react";

const App = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ani-list" element={<HomePage />} />
                <Route path="/ani-list/search/:page" element={<SearchPage />} />
                <Route
                    path="/ani-list/description/:type/:id"
                    element={<DescriptionPage />}
                />
                <Route path="/ani-list/about" element={<SearchPage />} />
                {/* <Route path="*" element={<ErrorPage />} /> */}
            </Routes>
        </div>
    );
};

export default App;
