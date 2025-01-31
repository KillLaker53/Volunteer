import React from "react";
import { UserDonationDto } from "types-api-volunteer/src";
import "./UserDonation.css"; 
import { FaDonate } from "react-icons/fa";

interface UserDonationProps {
  donation: UserDonationDto;
}

const UserDonation: React.FC<UserDonationProps> = ({ donation }) => {
  return (
    <div className="user-donation-card">
      <div className="user-donation-information">
        <h3>{donation.eventName}</h3>
        
        <div className="user-donation-card-amount">
            <FaDonate />
            <p>
              <strong>Amount: </strong> 15lv
            </p>

        </div>
      </div>
    </div>
  );
};

export default UserDonation;
