import React, { useState, useEffect } from "react";
import "./Books-style.css";
import BooksScroll from "./BooksScroll";
import BottomSection from "../BottomSection/BottomSection";

function Books() {
    return (
        <div className="booksMain">
            <div className="bookpage-top">
                <div className="bookspage-name">
                    <div className="animated-title">
                        <div className="text-top">
                            <div>
                                <span>NARAD</span>
                                <span>Discover, read, explore.</span>
                            </div>
                        </div>
                        <div className="text-bottom">
                            <div>"Stories that inspire"</div>
                        </div>
                    </div>
                </div>
                <img src="booksimgTop.png" alt="Book Image" />
            </div>

            <div className="book-middle">
                <BooksScroll />
            </div>

            <div>
                <BottomSection />
            </div>
        </div>
    );
}

export default Books;
