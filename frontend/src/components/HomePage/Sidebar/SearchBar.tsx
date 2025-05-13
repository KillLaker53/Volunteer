import React, { useState } from "react";
import './SearchBar.css'
import { SidebarEventDto } from "types-api-volunteer/src";
import { filterEventsByName } from "../../../api/EventApi";
import Popup from "../../Shared/Popup";


interface SearchBarProps {
    setEvents: (events: SidebarEventDto[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setEvents}) => {
    const [query, setQuery] = useState<string>("");
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setQuery(e.target.value);
    };

    const handleSearch = async() => {
        try{
            const filteredEvents = await filterEventsByName(query);
            if(!filteredEvents){
                setShowPopup(true);
            } else{
                setEvents(filteredEvents);
            }
        }catch(err){
            console.error(err);
        }
        
    };

    return (
        <>
        
        <div className="search-bar">
            <input type="text" placeholder="Search..." value={query} onChange={handleInputChange} />
            <button className="search-bar-button" onClick={handleSearch}> 
                Search
            </button>
            
        </div>
        
            {showPopup && 
                <Popup setShowPopup={setShowPopup} popupTitle="Failed search" popupText="No events were found"/>
            }
            
        </>
    );
};

export default SearchBar;
