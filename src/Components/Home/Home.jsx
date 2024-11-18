import React, { useState, useEffect } from "react";
import "./Homestyle.css";
import BooksScroll from "../Books/BooksScroll";
import BottomSection from "../BottomSection/BottomSection";
import HomeBooks from "./HomeBooksSec/HomeBooks";
import VideoCont from "./Video_Cont/VideoCont";
import AudioControl from "./Video_Cont/AudioControl";
import Imageslider from "./Imageslider";
import BackToTopButton from "../BackToTop/BackToTop";

function Home() {
    const [homebooks, setHomebooks] = useState([
        { className: "story1", title: "Mona", img: "story1.jpg" },
        { className: "story2", title: "The Little Star", img: "story2.jpg" },
        { className: "story3", title: "Brownie", img: "story3.jpg" },
        { className: "story4", title: "The Connection", img: "story4.jpg" },
        { className: "story5", title: "Art of Living", img: "story5.jpg" },
        // { className: "story6", title: "Guns and Glory", img: "story6.jpg" },
    ]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        // Replace with your authentication check logic
        const user = localStorage.getItem("user"); // Example of checking login state
        setIsLoggedIn(!!user); // If user exists, set `isLoggedIn` to true
    }, []);
    return (
        <div className="Home-cont">
            <div className="backTotopButton">
                <BackToTopButton />
            </div>
            <div className="home-video-cont">
                <VideoCont />
            </div>
            <div className="audio-control">
                <AudioControl />
            </div>
            <div className="home_btmtoptext">
                <p>Check out these interesting books that you'll love!</p>
            </div>
            {/* <div className="imageslider"> */}
            <Imageslider />
            {/* </div> */}
            <div className="Home-Books">
                {homebooks?.map((item, index) => (
                    <div key={index} className="bookscont">
                        <HomeBooks books={item} isLoggedIn={isLoggedIn} />
                    </div>
                ))}
            </div>
            <div className="home_btmtext">
                <p className="fstTxT">
                    Let’s Tell <span className="World">World</span>
                </p>
                <p className="secTxT">
                    Some Good <span className="Stories">Stories</span>
                </p>
            </div>
            <div className="homeBtmsection">
                <BottomSection />
            </div>
        </div>
    );
}

export default Home;
