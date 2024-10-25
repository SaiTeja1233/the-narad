import React from "react";
import "./RippleEffect.css"; // Import the CSS

function RippleEffect() {
    return (
        <div>
            <div className="ripple-background">
                <div className="circle xxlarge shade1"></div>
                <div className="circle xlarge shade2"></div>
                <div className="circle large shade3"></div>
                <div className="circle medium shade4"></div>
                <div className="circle small shade5"></div>
            </div>
            <div className="right-ripple-background">
                <div className="circle xxlarge5 shade1"></div>
                <div className="circle xlarge4 shade2"></div>
                <div className="circle large3 shade3"></div>
                <div className="circle medium2 shade4"></div>
                <div className="circle small1 shade5"></div>
            </div>
        </div>
    );
}

export default RippleEffect;
