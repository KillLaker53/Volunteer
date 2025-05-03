import React from "react";
import { UserDto } from "types-api-volunteer/src";
import './UserInformation.css';

interface UserInformationProps {
    user: UserDto;
}

const UserInformation: React.FC<UserInformationProps> = ({ user }) => {
    return (
        <div className="user-info-container">
            <h1 className="user-info-header">Welcome to Your Profile</h1>
            <div className="user-info-card">
                <div className="user-info-item">
                    <strong>First Name:</strong> {user.firstName}
                    <button className="edit-button">Edit</button>
                </div>
                <div className="user-info-item">
                    <strong>Last Name:</strong> {user.lastName}
                    <button className="edit-button">Edit</button>
                </div>
                <div className="user-info-item">
                    <strong>Email:</strong> {user.email}
                    <button className="edit-button">Edit</button>
                </div>
                <div className="user-info-item">
                    <strong>Phone:</strong> {user.phone}
                    <button className="edit-button">Edit</button>
                </div>
                <div className="user-info-item">
                    <strong>Role:</strong> {user.role}
                </div>
            </div>
        </div>
    );
}

export default UserInformation;
