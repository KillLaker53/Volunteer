import React from 'react';
import './Button.css';

interface ButtonProps {
    onClick: () => void;
    icon?: string;
    altText?: string;
    children: string;
}


const Button: React.FC<ButtonProps> = ({onClick, icon, altText, children}) => {
    return(
        <button className='button' onClick={onClick}>
            {
            icon && 
            <img src={icon} alt={altText} className='button-icon'/>
            }
            {children}
        </button>
    );
}

export default Button;