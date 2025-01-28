import React, { useState } from "react";
import "./Popup.css";

interface PopupProps {
  setShowPopup: (arg0: boolean) => void;
  popupTitle: string;
  popupText: string;
  isDonationPopup?: boolean; 
  onSend?: (amount: number) => void; 
}

const Popup: React.FC<PopupProps> = ({
  popupTitle,
  popupText,
  setShowPopup,
  isDonationPopup = false,
  onSend,
}) => {
  const [amount, setAmount] = useState<number | string>("");

  const handleSend = () => {
    if (typeof onSend === "function" && typeof amount === "number" && amount > 0) {
      onSend(amount);
      setShowPopup(false); 
    } else {
      alert("Please enter a valid amount.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{popupTitle}</h2>
        <p>{popupText}</p>
        {isDonationPopup && (
          <div className="donation-section">
            <input
              id="donation-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
            />
            <button onClick={handleSend} className="popup-send-button">
              Send
            </button>
          </div>
        )}
        <button
          onClick={() => setShowPopup(false)}
          className="popup-close-button"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
