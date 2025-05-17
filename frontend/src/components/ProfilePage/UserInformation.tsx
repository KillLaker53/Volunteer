import React, { useEffect, useState } from "react";
import { UserDto } from "types-api-volunteer/src";
import './UserInformation.css';
import Popup from "../Shared/Popup";
import { useNavigate } from "react-router-dom";
import { updateField } from "../../api/UserApi";

interface UserInformationProps {
    user: UserDto;
}

const UserInformation: React.FC<UserInformationProps> = ({ user }) => {
    const navigate = useNavigate();
    const [editingField, setEditingField] = useState<keyof UserDto | null>(null);
    const [formData, setFormData] = useState<UserDto>({ ...user });
    const [isSaving, setIsSaving] = useState(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        try{
            const token = localStorage.getItem('token');
            if(!token){
                navigate('/login', {replace: true});
            }else{
                setToken(token);
            }
        }catch(err){
            console.error(err);         
        }

    }, []);

    const handleEditClick = (field: keyof UserDto) => {
        setEditingField(field);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleSave = async() => {
        if(!editingField){
            return;
        }
        setIsSaving(true);

        try{
            const updatedValue = { [editingField]: formData[editingField]}
            await updateField(token, updatedValue)
            setShowPopup(true);
            setEditingField(null);
            
            setIsSaving(false);
        }catch(err){
            console.error(err);
        }   
    }
   
    const renderField = (label: string, field: keyof UserDto) => (
        <div className="user-info-item">
            <strong>{label}:</strong>
            {editingField === field ? (
                <>
                    <input
                        className="user-info-edit-field"
                        type="text"
                        name={field}
                        value={formData[field] || ""}
                        onChange={handleChange}
                    />
                    <button className="save-button" onClick={handleSave} disabled={isSaving}>Save</button>
                </>
            ) : (
                <>
                    {formData[field]}
                    <button className="edit-button" onClick={() => handleEditClick(field)}>Edit</button>
                </>
            )}
        </div>
    );

    return (
        <>
            <div className="user-info-container">
                <h1 className="user-info-header">Welcome to Your Profile</h1>
                <div className="user-info-card">
                    {renderField("First Name", "firstName")}
                    {renderField("Last Name", "lastName")}
                    {renderField("Email", "email")}
                    {renderField("Phone", "phone")}
                    <div className="user-info-item">
                        <strong>Role:</strong> {user.role}
                    </div>
                </div>
            </div>
            {showPopup &&
                <Popup setShowPopup={setShowPopup} popupTitle="Successfully updated" popupText="The update was successful"/>
            }
        </>
    );
};

export default UserInformation;
