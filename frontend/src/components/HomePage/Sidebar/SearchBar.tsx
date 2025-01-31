import React, { useState } from "react";
import './SearchBar.css'
import { SidebarEventDto } from "types-api-volunteer/src";
import { filterSidebarEventsByName } from "../../../library/utils";


interface SearchBarProps {
    events: SidebarEventDto[];
    setEvents: (events: SidebarEventDto[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({events, setEvents}) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        const filteredEvents = filterSidebarEventsByName(query, events);
        setEvents(filteredEvents);
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
