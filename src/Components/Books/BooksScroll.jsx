import React from "react";
import "./BooksScroll.css";
import { useNavigate } from "react-router-dom";

function BooksScroll() {
    const navigate = useNavigate();

    const toflipbook = (storyName) => {
        navigate("/flipbook", { state: { story: storyName } });
    };

    return (
        <div className="books">
            <div className="bookpage1">
                <div className="inner">
                    <div class="card">
                        <div className="top-card">
                            <img src="story1.jpg" alt="" />
                        </div>
                        <div className="bottom-card">
                            <div className="card-content">
                                <span className="card-title">Mona</span>
                                <button
                                    className="card-btn"
                                    onClick={() => toflipbook("Mona")}
                                >
                                    ReadMe Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Books-cover">
                    <img src="story1.jpg" alt="" />
                </div>
            </div>
            <div className="bookpage1">
                <div className="inner">
                    <div class="card">
                        <div className="top-card">
                            <img src="story2.jpg" alt="" />
                        </div>
                        <div className="bottom-card">
                            <div className="card-content">
                                <span className="card-title">
                                    The Little Star
                                </span>
                                <button
                                    className="card-btn"
                                    onClick={() =>
                                        toflipbook("The Little Star")
                                    }
                                >
                                    ReadMe Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Books-cover">
                    <img src="story2.jpg" alt="" />
                </div>
            </div>
            <div className="bookpage1">
                <div className="inner">
                    <div class="card">
                        <div className="top-card">
                            <img src="story3.jpg" alt="" />
                        </div>
                        <div className="bottom-card">
                            <div className="card-content">
                                <span className="card-title">Brownie</span>
                                <button
                                    className="card-btn"
                                    onClick={() => toflipbook("Brownie")}
                                >
                                    ReadMe Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Books-cover">
                    <img src="story3.jpg" alt="" />
                </div>
            </div>
            <div className="bookpage1">
                <div className="inner">
                    <div class="card">
                        <div className="top-card">
                            <img src="story4.jpg" alt="" />
                        </div>
                        <div className="bottom-card">
                            <div className="card-content">
                                <span className="card-title">
                                    Art 0f Living"
                                </span>
                                <button
                                    className="card-btn"
                                    onClick={() => toflipbook("Art 0f Living")}
                                >
                                    ReadMe Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Books-cover">
                    <img src="story4.jpg" alt="" />
                </div>
            </div>
            <div className="bookpage1">
                <div className="inner">
                    <div class="card">
                        <div className="top-card">
                            <img src="story5.jpg" alt="" />
                        </div>
                        <div className="bottom-card">
                            <div className="card-content">
                                <span className="card-title">
                                    Guns and Glory
                                </span>
                                <button
                                    className="card-btn"
                                    onClick={() => toflipbook("Guns and Glory")}
                                >
                                    ReadMe Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Books-cover">
                    <img src="story5.jpg" alt="" />
                </div>
            </div>
        </div>
    );
}

export default BooksScroll;
