import React from "react";
import "./Aboutanim3.css"; // Make sure to create a CSS file for styling

const Aboutanim3 = () => {
    return (
        <div className="cube div">
            <div className="top div"></div>
            <div className="div">
                {[0, 1, 2, 3].map((i) => (
                    <span className="span" key={i} style={{ "--i": i }}>
                        {/* <img src="Logo.png" alt="" style={{ height: "8vh" }} /> */}
                        <img src="Logo.png" alt="" style={{ height: "8vh" }} />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Aboutanim3;
