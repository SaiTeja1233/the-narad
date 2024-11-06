import React from "react";
import "./Loading.css"; // Import your loading styles

const Loading = ({ showPopup, popupMessage }) => {
    return (
        <div className="loadinganim">
            <div className="typewriter">
                <div className="slide">
                    <i></i>
                </div>
                <div className="paper"></div>
                <div className="keyboard"></div>
            </div>
            <div className="scanner">
                <span>Loading...</span>
            </div>
            {showPopup && (
                <div className="popup">
                    <p>{popupMessage}</p>
                </div>
            )}
        </div>
    );
};

export default Loading;
