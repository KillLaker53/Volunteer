import React, { useState } from 'react';
import Datetime from 'react-datetime';
import './InputBox.css';
import "react-datetime/css/react-datetime.css";
interface InputBoxProps {
    type?: string
    title?: string;
    value?: string;
    setValue: (arg0: string) => void;
    placeHolder?: string
}

const InputBox: React.FC<InputBoxProps> = ({type, title, setValue, placeHolder}) => {
    
    const [selectedOption, setSelectedOption] = useState<string>("");

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setValue(option); 
    };

    const handleDateSelect = (date: string) => {
        setValue(date);
    }
    
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
            ) : type==='date' ? (
                <Datetime
                dateFormat='YYYY-MM-DD'
                timeFormat= 'HH:mm'
                locale='bg'
                onChange={(value) => handleDateSelect(value.toLocaleString())}
                className="create-event-input-box-date"
                />
            ) : (
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