import React, { useEffect, useState } from 'react';
import Header from '../Header';
import { useParams } from 'react-router-dom';
import { UserDto } from 'types-api-volunteer/src';
import UserInformation from './UserInformation';
import { fetchUser } from '../../api/UserApi';
import UserActivity from './UserActivity';


const ProfilePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const { userId } = useParams<{userId?: string}>();
    const [user, setUser] = useState<UserDto | null>();
    const [doesUserExist, setDoesUserExist] = useState<boolean>(false);


    
    useEffect(() => {
        const fetchAndSetUser = async() => {
            if(!userId){
                setDoesUserExist(false);
                return;
            }  
            try{
                const user = await fetchUser(userId);
                if(user){
                    setUser(user);
                    setDoesUserExist(true);
                } else{
                    setDoesUserExist(false);
                }
            } catch(error){
                console.error("Error fetching the user", error);
                setDoesUserExist(false);
            }
        }

        fetchAndSetUser()
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

    }, [userId]);

    if(!doesUserExist){
        return <p>Invalid user page</p>
    }
    return(
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Header>
            { user && 
                <>
                    <UserInformation user={user} />
                    <UserActivity user={user} />
                </>
            }
        </>
    );
}

export default ProfilePage;