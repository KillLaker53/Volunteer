import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import Button from './HomePage/Button';
import { myProfileIcon } from '../library/constants';

interface HeaderProps{
  isLoggedIn: boolean;
  setIsLoggedIn: (arg0: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({isLoggedIn, setIsLoggedIn}) => {
  const navigate = useNavigate(); 

  const handleSignInClick = () => {
    navigate('/login');
  }

  const handleSignOutClick = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  }

  const handleProfileClick = () => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login');
    }else{
      navigate('/profile');
    }
  }

  const handleMapClick = () => {
    navigate('/');
  }

  return (
  
    <div className='header'>
        <div className='logo'>
        <h1> Volunteer </h1>
        </div>
        
        
        <div className='button-container'>
          <Button onClick={handleProfileClick} icon={myProfileIcon}>Profile</Button>
          <Button onClick={handleMapClick}>Map</Button>
          {
            isLoggedIn
                ? <Button onClick={handleSignOutClick}>Sign out</Button>
                : <Button onClick={handleSignInClick}>Sign in</Button>
          }
        </div>
        
     
   
    </div>
  );
};

export default Header;