import React, { useState } from 'react';

import './InputBox.css';

interface InputBoxProps {
    type?: string
    title?: string;
    setValue: (arg0: string) => void;
    placeHolder?: string
}

const InputBox: React.FC<InputBoxProps> = ({type, title, setValue, placeHolder}) => {
    
    const [selectedOption, setSelectedOption] = useState<string>("");

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setValue(option); 
    };

    
    return(
        <>
            <div className='create-event-input-box-title'> {title}</div>
            
            { type === 'description' ? (
                <textarea 
                placeholder={placeHolder}
                onChange={(e) => setValue(e.target.value)} 
                className='create-event-input-box-description'/>
        
            ) : type==='slider' ? (
                <div className="create-event-input-box-slider">
                {["Flooding", "Fire", "Earthquake"].map((option) => (
                    <div
                        key={option}
                        className={`create-event-option ${selectedOption === option ? "active" : ""}`}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option}
                    </div>
                ))}
            </div>
            ) :  (
                <input 
                placeholder={placeHolder}
                onChange={(e) => setValue(e.target.value)} 
                className='create-event-input-box'/>
        
            )   
            } 
            
        </>
        
    );
}

export default InputBox;