import React, { useState } from "react";
import { UserDto } from "types-api-volunteer/src";
import './UserRoleCard.css';
import { updateUserRole } from "../../api/UserApi";
import { myProfileIcon, roleOptions } from "../../library/constants";

interface UserRoleCardProps {
    token: string;
    user: UserDto;
}

const UserRoleCard: React.FC<UserRoleCardProps> = ({ token, user }) => {
    const [role, setRole] = useState(user.role);

    const onRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRole = event.target.value;
        try {
            await updateUserRole(token, user._id, selectedRole);
            setRole(selectedRole); 
        } catch (err) {
            console.error("Updating user role was not successful")
        }
    };

    return (
        <div className="user-role-card">
            <img src={myProfileIcon} alt='' className='button-icon' />
            <div className="user-role-card-name">
                {user.firstName} {user.lastName}
            </div>
            <select
                className="user-role-dropdown"
                value={role}
                onChange={onRoleChange}
            >
                {roleOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default UserRoleCard;
