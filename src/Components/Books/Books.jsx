import React from "react";
import { motion } from "framer-motion";
import "./Books-style.css";
import BooksScroll from "./BooksScroll";
import BottomSection from "../BottomSection/BottomSection";

function Books() {
    return (
        <motion.div
            className="booksMain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }} // Initial fade-in effect for the whole component
        >
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
                <motion.img
                    src="booksimgTop.png"
                    alt="Book Image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }} // Slow fade-in for the image
                />
            </div>

            <motion.div
                className="book-middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }} // Fade-in for the book section
            >
                <BooksScroll />
            </motion.div>

            <div>
                <BottomSection />
            </div>
        </motion.div>
    );
}

export default Books;
