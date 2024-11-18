import React, { useEffect } from "react";
import "./HomeBooks.css";
import ScrollReveal from "scrollreveal";
import { Link, useNavigate } from "react-router-dom";

function HomeBooks({ books, isLoggedIn }) {
    const navigate = useNavigate();

    useEffect(() => {
        ScrollReveal().reveal(`#homeBooksmain-${books.className}`, {
            origin: "bottom",
            distance: "50px",
            duration: 1000,
            delay: 200,
            reset: false,
        });
    }, [books.className]);

    const handleContinue = () => {
        if (isLoggedIn) {
            navigate("/books"); // Navigate to books page
        } else {
            navigate("/loginpage"); // Navigate to login page
        }
    };

    return (
        <div className="homebooks">
            <div
                className={books.className}
                id={`homeBooksmain-${books.className}`}
            >
                <div className="outerline">
                    <div className="homecardTop">
                        <div className="hometopImg">
                            <img src={books.img} alt={books.title} />
                        </div>
                        <div className="homeTitle">
                            <p>{books.title}</p>
                            <div className="line"></div>
                        </div>
                        <div className="homeCardBtn">
                            <button
                                className="homeBooksBtn"
                                onClick={handleContinue}
                            >
                                <span>Continue</span>
                                <svg
                                    width="34"
                                    height="34"
                                    viewBox="0 0 74 74"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="37"
                                        cy="37"
                                        r="35.5"
                                        stroke="black"
                                        strokeWidth="3"
                                    ></circle>
                                    <path
                                        d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                                        fill="black"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="cover">
                    <img src={books.img} alt={books.title} />
                </div>
            </div>
        </div>
    );
}

export default HomeBooks;
