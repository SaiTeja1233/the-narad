import React from "react";
import "./Imageslider.css";

const ImageScroll = () => {
    return (
        <div className="scroll-wrapper">
            <div className="scroll-container">
                <img src="story1.jpg" alt="Image 1" />
                <img src="story2.jpg" alt="Image 2" />
                <img src="story3.jpg" alt="Image 3" />
                <img src="story4.jpg" alt="Image 4" />
                <img src="story5.jpg" alt="Image 5" />
                <img src="story6.jpg" alt="Image 6" />

                {/* Duplicating the images for seamless infinite scroll */}
                <img src="story1.jpg" alt="Image 1" />
                <img src="story2.jpg" alt="Image 2" />
                <img src="story3.jpg" alt="Image 3" />
                <img src="story4.jpg" alt="Image 4" />
                <img src="story5.jpg" alt="Image 5" />
                <img src="story6.jpg" alt="Image 6" />
            </div>
        </div>
    );
};

export default ImageScroll;
