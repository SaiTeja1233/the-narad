import React from "react";
import "./Popup.css"; // Create a CSS file for styling

const Popup = ({ message, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup">
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Popup;
