import React, { useRef } from "react";

const VideoCont = () => {
    return (
        <div className="video-container" style={{ color: "white" }}>
            <video
                style={{
                    width: "100%",
                    height: "100vh",
                    objectFit: "cover",
                    transition: "width 0.2s ease, height 0.2s ease",
                }}
                // controls
                autoPlay
                loop
                muted
            >
                <source src="homevid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoCont;
