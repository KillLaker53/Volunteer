import React from "react";
import './UserRolesPanel.css';
import { UserDto } from "types-api-volunteer/src";
import UserRoleCard from "./UserRoleCard";

interface UserRolesPanelProps {
    token: string;
    users: UserDto[] | undefined;
}

const UserRolesPanel: React.FC<UserRolesPanelProps> = ({token, users }) => {
    return (
        <>
            <div className="user-roles-title">
                User Roles Management
            </div>
            {users &&
                users.map((user) => (
                    <UserRoleCard key={user._id} token={token} user={user} />
                ))}
        </>
    );
};

export default UserRolesPanel;
