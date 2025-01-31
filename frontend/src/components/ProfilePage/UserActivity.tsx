import React from "react";
import { UserDto } from "types-api-volunteer/src";
import SignedUpEvents from "./SignedUpEvents";
import Donations from "./Donations";
import './UserActivity.css';

interface UserActivityProps {
    setShowPopup: (arg0: boolean) => void;
    user: UserDto;
}

const UserActivity: React.FC<UserActivityProps> = ({setShowPopup, user}) => {
    return(
        <div className="activity-container">
            <SignedUpEvents setShowPopup={setShowPopup} user={user} />
            <Donations user={user} />
        </div>
    );
}

export default UserActivity;