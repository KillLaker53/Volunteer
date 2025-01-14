import React from "react";
import { UserDto } from "types-api-volunteer/src";
import SignedUpEvents from "./SignedUpEvents";
import Donations from "./Donations";
import './UserActivity.css';

interface UserActivityProps {
    user: UserDto;
}

const UserActivity: React.FC<UserActivityProps> = ({user}) => {
    return(
        <div className="activity-container">
            <SignedUpEvents userId={user._id} />
            <Donations userId={user._id} />
        </div>
    );
}

export default UserActivity;