import React, { useEffect, useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import Button from '../HomePage/Button';
import { adminIcon, myProfileIcon } from '../../library/constants';
import { DecodedToken } from '../../library/types';
import { jwtDecode } from 'jwt-decode';

interface HeaderProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (arg0: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setDecodedToken(decoded);
        setRole(decoded.role);
      } catch (err) {
        console.log("Error decoding token", err);
        navigate('/login');
      }
    }
  }, [navigate]);

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleSignOutClick = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleAdminMenuClick = () => {
    navigate('/admin');
  };

  const handleProfileClick = () => {
    if (decodedToken && decodedToken.id) {
      navigate(`/profile/${decodedToken.id}`);
    } else {
      console.log("Error finding the user");
      navigate('/login');
    }
  };

  const handleMapClick = () => {
    navigate('/');
  };

  return (
    <div className='header'>
      <div className='logo'>
        <h1>Volunteer</h1>
      </div>
      <div className='button-container'>
        {isLoggedIn && role === "admin" && (
          <Button onClick={handleAdminMenuClick} icon={adminIcon}>Admin</Button>
        )}

        <Button onClick={handleProfileClick} icon={myProfileIcon}>Profile</Button>
        <Button onClick={handleMapClick}>Map</Button>

        {isLoggedIn ? (
          <Button onClick={handleSignOutClick}>Sign out</Button>
        ) : (
          <Button onClick={handleSignInClick}>Sign in</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
