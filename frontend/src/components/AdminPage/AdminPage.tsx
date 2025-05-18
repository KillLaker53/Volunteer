import React, { useEffect, useState } from 'react';
import './AdminPage.css';
import UserRolesPanel from './UserRolesPanel';
import EventApprovalPanel from './EventsApprovalPanel';
import { EventDto, UserDto } from 'types-api-volunteer/src';
import { fetchUsers } from '../../api/UserApi';
import { useNavigate } from 'react-router-dom';
import { fetchAdminEvents, fetchUnapprovedEvents } from '../../api/EventApi';
import AdminHeader from './AdminHeader';

interface AdminPageProps {
}

const AdminPage: React.FC<AdminPageProps> = () => {
    const navigate = useNavigate();
    const [activePanel, setActivePanel] = useState<'users' | 'events'>('users');
    const [users, setUsers] = useState<UserDto[]>();
    const [events, setEvents] = useState<EventDto[]>();
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        const fetchAndSetUsers = async() => {
            try{
                const users: UserDto[] = await fetchUsers();
                setUsers(users);
            
            }catch(err){
                console.error(err);
            }
        }

        const fetchAndSetEvents = async() => {
            try{
                const events: EventDto[] | undefined = await fetchAdminEvents();
                setEvents(events);
                console.log(events);
            }catch(err){
                console.error(err);
            }
        }

        fetchAndSetUsers();
        fetchAndSetEvents();
        console.log(events);
        const token: string | null = localStorage.getItem('token');
        if(!token){
            navigate('/login');
        } else {
            setToken(token);
        }

    }, []);

    return (
        <div className="admin-page">
            <AdminHeader activePanel={activePanel} setActivePanel={setActivePanel}/>
            <div className="admin-content-container">
                <div className="admin-main-content">
                    { activePanel === 'users' ? <UserRolesPanel token={token} users={users}/> : <EventApprovalPanel token={token} events={events} />

                    } 
                </div>
            </div>
        </div>
    );
}

export default AdminPage;