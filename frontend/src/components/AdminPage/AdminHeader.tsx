import React from 'react';
import './AdminHeader.css';

interface AdminHeaderProps {
    activePanel: 'users' | 'events';
    setActivePanel: (panel: 'users' | 'events') => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ activePanel, setActivePanel }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value as 'users' | 'events';
        setActivePanel(selected);
    };

    return (
        <div className="admin-header">
            <select value={activePanel} onChange={handleChange}>
                <option value="users">Users</option>
                <option value="events">Events</option>
            </select>
            <span>Admin Menu</span>
            
        </div>
    );
};

export default AdminHeader;
