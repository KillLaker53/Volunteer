import React from "react";
import './Donations.css';

interface DonationsProps{
    userId: string;
}

const Donations: React.FC<DonationsProps> = () => {
    return(
        <div className="user-donations-box">
            <h2><strong>Your donations</strong></h2>
        </div>
    )
} 

export default Donations;