import React, { useState } from "react";
import './SearchBar.css'
const SearchBar = () => {
    const [query, setQuery] = useState("");

    const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        console.log("Search query:", query);
        // add search
    };

    return (
        <div className="search-bar">
            <input type="text" placeholder="Search..." value={query} onChange={handleInputChange} />
            <button className="search-bar-button" onClick={handleSearch}> 
                Search
            </button>
        </div>
    );
};

export default SearchBar;
