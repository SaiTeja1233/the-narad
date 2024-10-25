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
                <p className="text">World</p>
                <div className="inner">
                    <div class="card">
                        <div className="top-card"></div>
                        <div className="bottom-card">
                            <div className="card-content">
                                <span className="card-title">Card Title</span>
                                <p className="card-txt">A simple card</p>
                                <a href="#" className="card-btn">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* <button onClick={() => toflipbook("Mona")}>
                        ReadMe Now
                    </button> */}
                </div>
                <div className="Books-cover">
                    <img src="story1.jpg" alt="" />
                </div>
            </div>
            <div className="bookpage1">
                <p className="text">World</p>
                <div className="inner">
                    <p className="text">The Little Star</p>
                    <button onClick={() => toflipbook("The Little Star")}>
                        ReadMe Now
                    </button>
                </div>
                <div className="Books-cover">
                    <img src="story2.jpg" alt="" />
                </div>
            </div>
            <div className="bookpage1">
                <p className="text">Hello</p>
                <div className="inner">
                    <p className="text">Brownie</p>
                    <button onClick={() => toflipbook("Brownie")}>
                        ReadMe Now
                    </button>
                </div>
                <div className="Books-cover">
                    <img src="story3.jpg" alt="" />
                </div>
            </div>
            <div className="bookpage1">
                <p className="text">Hello</p>
                <div className="inner">
                    <p className="text">Art 0f Living</p>
                    <button onClick={() => toflipbook("Art 0f Living")}>
                        ReadMe Now
                    </button>
                </div>
                <div className="Books-cover">
                    <img src="story4.jpg" alt="" />
                </div>
            </div>
            <div className="bookpage1">
                <p className="text">Hello</p>
                <div className="inner">
                    <p className="text">Guns and Glory</p>
                    <button onClick={() => toflipbook("Guns and Glory")}>
                        ReadMe Now
                    </button>
                </div>
                <div className="Books-cover">
                    <img src="story5.jpg" alt="" />
                </div>
            </div>
            <div className="bookpage1">
                <p className="text">Hello</p>
                <div className="inner">
                    <p className="text">World</p>
                    <button onClick={() => toflipbook("Mona")}>
                        ReadMe Now
                    </button>
                </div>
                <div className="Books-cover">
                    <img src="story6.jpg" alt="" />
                </div>
            </div>
            {/* <div class="book1">
                <p class="text">Hello</p>
                <div class="inner">
                    <p class="text">World</p>
                </div>
                <div class="Books-cover">
                    <img src="story1.jpg" alt="" />
                </div>
            </div> */}
        </div>
    );
}

export default BooksScroll;
