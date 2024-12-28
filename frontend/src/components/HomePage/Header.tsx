import React, { useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import SearchBar from './SearchBar';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate(); 

  const handleSignInClicK = () => {
    navigate('/login');
  }

  const handleSignOutClick = () => {
    //clear user session
    setIsLoggedIn(false);
  }

  return (
  
    <div className='header'>
      <SearchBar />
      {
        isLoggedIn ? (<Button onClick={handleSignOutClick} children='Sign out'/>) : 
        (<Button onClick={handleSignInClicK} children='Sign in'/>)
      }
   
    </div>
  );
};

export default Header;